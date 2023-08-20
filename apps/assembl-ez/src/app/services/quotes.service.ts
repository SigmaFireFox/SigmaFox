import { Injectable } from '@angular/core';
import {
  ComponentGroup,
  ComponentItem,
  TestComponentList,
} from '../test-data/components.data';
import {
  ComparisionType,
  ComponentDependencyType,
  ComponentInput,
  ComponentReferance,
  ComponentRuleCondition,
  ComponentRuleConditionTest,
  ComponentRuleFormula,
  ComponentRuleType,
  ConditionBinder,
  FormulaOpertor,
  Product,
  ProductGroup,
  Rounding,
  TestProductList,
  VariableType,
} from '../test-data/products.data';

export interface QuoteParams {
  productGroup: string;
  productRange: string;
  productSelect: string | null;
  presentNonRequiredComponents: boolean;
  projection?: string;
  area?: string;
  width?: string;
  perimeter?: string;
}

export interface QuoteResponse {
  quotedProducts: QuotedProduct[];
}

export interface QuotedProduct {
  productName: string;
  price: number;
  components: QuotedProductComponent[];
}

export interface QuotedProductComponent {
  componentGroup: string;
  componentName: string;
  componentQuantity: number;
  componentTotalPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  quoteParams = {} as QuoteParams;
  components: ComponentGroup = TestComponentList;

  constructor() {}

  generateQuote(quoteParams: QuoteParams): QuoteResponse {
    this.quoteParams = quoteParams;

    // Get the product group
    let productGroups: ProductGroup[] = TestProductList;
    let selectedProductGroup = {} as ProductGroup;
    productGroups.forEach((productGroup) => {
      if (productGroup.productGroupName === quoteParams.productGroup) {
        selectedProductGroup = productGroup;
      }
    });

    // Get the selected products under the product group
    let productsSelected: Product[] = [];
    if (quoteParams.productRange === '1') {
      productsSelected = selectedProductGroup.products;
    } else {
      selectedProductGroup.products.forEach((product) => {
        if (quoteParams.productSelect?.includes(product.productName)) {
          productsSelected.push(product);
        }
      });
    }

    // Prepare the quote response
    let quoteResponse: QuoteResponse = { quotedProducts: [] };
    productsSelected.forEach((product) => {
      // Determine the components needed
      let components: QuotedProductComponent[] = [];
      product.components.forEach((component) => {
        const margin = product.margin;
        const quantity = this.calculateComponentQuantatiesRequired(component);
        if (quoteParams.presentNonRequiredComponents || !!quantity) {
          const totalPrice = this.calculateComponentTotalPrice(
            component,
            quantity,
            margin
          );
          const displayname = this.getComponentQuoteDisplayName(
            component.component.componentGroup,
            component.component.componentName
          );
          components.push({
            componentGroup: component.component.componentGroup,
            componentName: displayname,
            componentQuantity: quantity,
            componentTotalPrice: totalPrice,
          });
        }
      });

      // Calc product price
      let productTotalPrice = 0;
      components.forEach((component) => {
        productTotalPrice = productTotalPrice + component.componentTotalPrice;
      });

      // Prepare the quoted product
      let quotedProduct = {
        productName: product.productName,
        price: productTotalPrice,
        components: components,
      };
      quoteResponse.quotedProducts.push(quotedProduct);
    });

    return quoteResponse;
  }

  private calculateComponentQuantatiesRequired(
    component: ComponentInput
  ): number {
    switch (component.componentRuleType) {
      case ComponentRuleType.CONDITION: {
        if (component.componentRuleCondition) {
          return this.resolveCondition(component.componentRuleCondition);
        }
        break;
      }
      case ComponentRuleType.FORMULA: {
        if (component.componentRuleFormula) {
          return this.resolveFormula(component.componentRuleFormula);
        }
        break;
      }
      case ComponentRuleType.VALUE: {
        if (component.componentRuleValue) {
          return component.componentRuleValue;
        }
        break;
      }
    }
    return 0;
  }

  private resolveCondition(condition: ComponentRuleCondition): number {
    return this.assessConditionTest(condition.test)
      ? this.determineValue(condition.ifTrue, condition.ifTrueType)
      : this.determineValue(condition.ifFalse, condition.ifFalseType);
  }

  private assessConditionTest(test: ComponentRuleConditionTest): boolean {
    let conditions: {
      firstValue: number;
      secondValue: number;
      comparision: ComparisionType;
    }[] = [];
    test.conditions.forEach((condition) => {
      let firstValue = this.determineValue(
        test.conditions[0].firstVariable,
        test.conditions[0].firstVariableType
      );

      let secondValue = this.determineValue(
        test.conditions[0].secondVariable,
        test.conditions[0].secondVariableType
      );

      conditions.push({
        firstValue,
        secondValue,
        comparision: condition.comparisionType,
      });
    });

    let truthStates: boolean[] = [];
    conditions.forEach((condition) => {
      truthStates.push(this.assessConditionForTruth(condition));
    });

    switch (test.binder) {
      case ConditionBinder.AND: {
        return !truthStates.includes(false);
      }
      case ConditionBinder.OR: {
        return truthStates.includes(true);
      }
    }
  }

  private determineValue(
    variable:
      | number
      | ComponentDependencyType
      | ComponentReferance
      | ComponentRuleFormula
      | ComponentRuleCondition,
    variableType: VariableType
  ): number {
    switch (variableType) {
      case VariableType.NUMBER: {
        return variable as number;
      }

      case VariableType.DEPENDENCY: {
        switch (variable) {
          case ComponentDependencyType.WIDTH: {
            if (this.quoteParams.width) {
              return parseInt(this.quoteParams.width);
            }
            break;
          }
          case ComponentDependencyType.PROJECTION: {
            if (this.quoteParams.projection) {
              return parseInt(this.quoteParams.projection);
            }
            break;
          }
          case ComponentDependencyType.AREA: {
            if (this.quoteParams.area) {
              return parseInt(this.quoteParams.area);
            }
            break;
          }
          case ComponentDependencyType.PERIMETER: {
            if (this.quoteParams.perimeter) {
              return parseInt(this.quoteParams.perimeter);
            }
            break;
          }
        }
        break;
      }

      case VariableType.COMPONENT: {
        let componentGroup: ComponentItem[] =
          this.components[(variable as ComponentReferance).componentGroup];
        let requiredValue = 0;
        componentGroup.forEach((componentItem) => {
          if (
            componentItem.name ===
            (variable as ComponentReferance).componentName
          ) {
            requiredValue = componentItem.price;
          }
        });
        return requiredValue;
      }

      case VariableType.FORMULA: {
        return this.resolveFormula(variable as ComponentRuleFormula);
      }
    }
    return 0;
  }

  private assessConditionForTruth(condition: {
    firstValue: number;
    secondValue: number;
    comparision: ComparisionType;
  }): boolean {
    switch (condition.comparision) {
      case ComparisionType.LESS_THAN: {
        return condition.firstValue < condition.secondValue;
      }
      case ComparisionType.LESS_OR_EQUAL_TO: {
        return condition.firstValue <= condition.secondValue;
      }
      case ComparisionType.EQUAL_TO: {
        return condition.firstValue === condition.secondValue;
      }
      case ComparisionType.GREATER_OR_EQUAL_TO: {
        return condition.firstValue >= condition.secondValue;
      }
      case ComparisionType.GREATER_THAN: {
        return condition.firstValue > condition.secondValue;
      }
    }
  }

  private resolveFormula(formula: ComponentRuleFormula): number {
    let firstValue = this.determineValue(
      formula.firstVariable,
      formula.firstVariableType
    );
    let secondValue = this.determineValue(
      formula.secondVariable,
      formula.secondVariableType
    );

    switch (formula.rounding) {
      case Rounding.NONE: {
        return this.executeFormula(firstValue, secondValue, formula.operator);
      }
      case Rounding.ROUND: {
        return Math.round(
          this.executeFormula(firstValue, secondValue, formula.operator)
        );
      }
      case Rounding.ROUND_DOWN: {
        return Math.floor(
          this.executeFormula(firstValue, secondValue, formula.operator)
        );
      }
      case Rounding.ROUND_UP: {
        return Math.ceil(
          this.executeFormula(firstValue, secondValue, formula.operator)
        );
      }
    }
  }

  private executeFormula(
    firstValue: number,
    secondValue: number,
    operator: FormulaOpertor
  ): number {
    switch (operator) {
      case FormulaOpertor.ADD: {
        return firstValue + secondValue;
      }
      case FormulaOpertor.MINUS: {
        return firstValue - secondValue;
      }
      case FormulaOpertor.MULTIPLY_BY: {
        return firstValue * secondValue;
      }
      case FormulaOpertor.DIVIDE_BY: {
        return firstValue / secondValue;
      }
    }
  }

  private getComponentQuoteDisplayName(
    groupName: string,
    componentName: string
  ): string {
    const componentList: ComponentGroup = TestComponentList;
    let displayName = '';
    componentList[groupName].forEach((component) => {
      if (component.name === componentName) {
        displayName = component.displayQuotes
          ? component.displayQuotes
          : component.displayGeneral;
      }
    });
    return displayName;
  }

  private calculateComponentTotalPrice(
    component: ComponentInput,
    quantity: number,
    margin: number
  ): number {
    const componentList: ComponentGroup = TestComponentList;
    let targetComponent = {} as ComponentItem;
    componentList[component.component.componentGroup].forEach(
      (componentItem) => {
        if (componentItem.name === component.component.componentName) {
          targetComponent = componentItem;
        }
      }
    );

    let pricePerUnitExVAT = 0;
    pricePerUnitExVAT = targetComponent.incVAT
      ? targetComponent.price / 1.15
      : targetComponent.price;

    return pricePerUnitExVAT * (1 + margin) * quantity;
  }
}
