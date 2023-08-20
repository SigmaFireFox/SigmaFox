export enum ProductMeasurementType {
  WIDTH_PROJECTION,
}

export enum ComponentDependencyType {
  WIDTH,
  PROJECTION,
  AREA,
  PERIMETER,
}

export enum ComponentRuleType {
  CONDITION,
  FORMULA,
  VALUE,
}

export enum ComparisionType {
  LESS_THAN,
  LESS_OR_EQUAL_TO,
  EQUAL_TO,
  GREATER_OR_EQUAL_TO,
  GREATER_THAN,
}

export enum ConditionBinder {
  AND,
  OR,
}

export enum FormulaOpertor {
  ADD,
  MINUS,
  MULTIPLY_BY,
  DIVIDE_BY,
}

export enum Rounding {
  NONE,
  ROUND,
  ROUND_UP,
  ROUND_DOWN,
}

export enum VariableType {
  NUMBER,
  DEPENDENCY,
  COMPONENT,
  FORMULA,
  CONDITION,
}

export interface ComponentReferance {
  componentGroup: string;
  componentName: string;
}

export interface ComponentRuleCondition {
  test: ComponentRuleConditionTest;
  ifTrueType: VariableType;
  ifTrue:
    | number
    | ComponentDependencyType
    | ComponentReferance
    | ComponentRuleFormula
    | ComponentRuleCondition;
  ifFalseType: VariableType;
  ifFalse:
    | number
    | ComponentDependencyType
    | ComponentReferance
    | ComponentRuleFormula
    | ComponentRuleCondition;
}

export interface ComponentRuleConditionTest {
  binder: ConditionBinder;
  conditions: RuleCondition[];
}

export interface RuleCondition {
  firstVariableType: VariableType;
  firstVariable:
    | number
    | ComponentDependencyType
    | ComponentReferance
    | ComponentRuleFormula
    | ComponentRuleCondition;
  comparisionType: ComparisionType;
  secondVariableType: VariableType;
  secondVariable:
    | number
    | ComponentDependencyType
    | ComponentReferance
    | ComponentRuleFormula
    | ComponentRuleCondition;
}

export interface ComponentRuleFormula {
  rounding: Rounding;
  firstVariableType: VariableType;
  firstVariable:
    | number
    | ComponentDependencyType
    | ComponentReferance
    | ComponentRuleFormula;
  operator: FormulaOpertor;
  secondVariableType: VariableType;
  secondVariable:
    | number
    | ComponentDependencyType
    | ComponentReferance
    | ComponentRuleFormula;
}

export interface ProductGroup {
  productGroupName: string;
  productGroupMeasureType: ProductMeasurementType;
  products: Product[];
}

export interface Product {
  productName: string;
  margin: number;
  components: ComponentInput[];
}

export interface ComponentInput {
  component: ComponentReferance;
  componentRuleType: ComponentRuleType;
  componentRuleFormula?: ComponentRuleFormula;
  componentRuleCondition?: ComponentRuleCondition;
  componentRuleValue?: number;
}

export const TestProductList: ProductGroup[] = [
  {
    productGroupName: 'Awnings',
    productGroupMeasureType: ProductMeasurementType.WIDTH_PROJECTION,
    products: [
      {
        productName: 'Aluminium Lourve',
        margin: 0.35,
        components: [
          {
            component: {
              componentGroup: 'Aluminium',
              componentName: 'lourvePanel',
            },
            componentRuleType: ComponentRuleType.FORMULA,
            componentRuleFormula: {
              rounding: Rounding.ROUND_UP,
              firstVariableType: VariableType.DEPENDENCY,
              firstVariable: ComponentDependencyType.AREA,
              operator: FormulaOpertor.MULTIPLY_BY,
              secondVariableType: VariableType.NUMBER,
              secondVariable: 7.5,
            },
          },
          {
            component: {
              componentGroup: 'Aluminium',
              componentName: 'lourveCarrier',
            },
            componentRuleType: ComponentRuleType.CONDITION,
            componentRuleCondition: {
              test: {
                binder: ConditionBinder.AND,
                conditions: [
                  {
                    firstVariableType: VariableType.DEPENDENCY,
                    firstVariable: ComponentDependencyType.WIDTH,
                    comparisionType: ComparisionType.LESS_THAN,
                    secondVariableType: VariableType.NUMBER,
                    secondVariable: 3000,
                  },
                ],
              },
              ifTrueType: VariableType.FORMULA,
              ifTrue: {
                rounding: Rounding.NONE,
                firstVariableType: VariableType.DEPENDENCY,
                firstVariable: ComponentDependencyType.PROJECTION,
                operator: FormulaOpertor.DIVIDE_BY,
                secondVariableType: VariableType.NUMBER,
                secondVariable: 500,
              },
              ifFalseType: VariableType.CONDITION,
              ifFalse: {
                test: {
                  binder: ConditionBinder.AND,
                  conditions: [
                    {
                      firstVariableType: VariableType.DEPENDENCY,
                      firstVariable: ComponentDependencyType.WIDTH,
                      comparisionType: ComparisionType.EQUAL_TO,
                      secondVariableType: VariableType.NUMBER,
                      secondVariable: 3000,
                    },
                  ],
                },
                ifTrueType: VariableType.CONDITION,
                ifTrue: {
                  test: {
                    binder: ConditionBinder.AND,
                    conditions: [
                      {
                        firstVariableType: VariableType.DEPENDENCY,
                        firstVariable: ComponentDependencyType.PROJECTION,
                        comparisionType: ComparisionType.GREATER_THAN,
                        secondVariableType: VariableType.NUMBER,
                        secondVariable: 3500,
                      },
                    ],
                  },
                  ifTrueType: VariableType.FORMULA,
                  ifTrue: {
                    rounding: Rounding.ROUND,
                    firstVariableType: VariableType.DEPENDENCY,
                    firstVariable: ComponentDependencyType.PROJECTION,
                    operator: FormulaOpertor.DIVIDE_BY,
                    secondVariableType: VariableType.NUMBER,
                    secondVariable: 333,
                  },
                  ifFalseType: VariableType.FORMULA,
                  ifFalse: {
                    rounding: Rounding.ROUND,
                    firstVariableType: VariableType.DEPENDENCY,
                    firstVariable: ComponentDependencyType.PROJECTION,
                    operator: FormulaOpertor.DIVIDE_BY,
                    secondVariableType: VariableType.NUMBER,
                    secondVariable: 500,
                  },
                },
                ifFalseType: VariableType.FORMULA,
                ifFalse: {
                  rounding: Rounding.NONE,
                  firstVariableType: VariableType.DEPENDENCY,
                  firstVariable: ComponentDependencyType.PROJECTION,
                  operator: FormulaOpertor.DIVIDE_BY,
                  secondVariableType: VariableType.NUMBER,
                  secondVariable: 333,
                },
              },
            },
          },
          {
            component: {
              componentGroup: 'Aluminium',
              componentName: 'lourveBeam',
            },
            componentRuleType: ComponentRuleType.CONDITION,
            componentRuleCondition: {
              test: {
                binder: ConditionBinder.AND,
                conditions: [
                  {
                    firstVariableType: VariableType.DEPENDENCY,
                    firstVariable: ComponentDependencyType.WIDTH,
                    comparisionType: ComparisionType.LESS_THAN,
                    secondVariableType: VariableType.NUMBER,
                    secondVariable: 4500,
                  },
                  {
                    firstVariableType: VariableType.DEPENDENCY,
                    firstVariable: ComponentDependencyType.PROJECTION,
                    comparisionType: ComparisionType.LESS_THAN,
                    secondVariableType: VariableType.NUMBER,
                    secondVariable: 3000,
                  },
                ],
              },
              ifTrueType: VariableType.NUMBER,
              ifTrue: 0,
              ifFalseType: VariableType.NUMBER,
              ifFalse: 1,
            },
          },
          {
            component: {
              componentGroup: 'Aluminium',
              componentName: 'gutter',
            },
            componentRuleType: ComponentRuleType.FORMULA,
            componentRuleFormula: {
              rounding: Rounding.NONE,
              firstVariableType: VariableType.DEPENDENCY,
              firstVariable: ComponentDependencyType.PERIMETER,
              operator: FormulaOpertor.ADD,
              secondVariableType: VariableType.NUMBER,
              secondVariable: 0.8,
            },
          },
          {
            component: {
              componentGroup: 'Gearboxes',
              componentName: 'gearbox',
            },
            componentRuleType: ComponentRuleType.CONDITION,
            componentRuleCondition: {
              test: {
                binder: ConditionBinder.AND,
                conditions: [
                  {
                    firstVariableType: VariableType.DEPENDENCY,
                    firstVariable: ComponentDependencyType.AREA,
                    comparisionType: ComparisionType.LESS_THAN,
                    secondVariableType: VariableType.NUMBER,
                    secondVariable: 16,
                  },
                ],
              },
              ifTrueType: VariableType.NUMBER,
              ifTrue: 1,
              ifFalseType: VariableType.NUMBER,
              ifFalse: 2,
            },
          },
          {
            component: {
              componentGroup: 'Gearboxes',
              componentName: 'crankHandle',
            },
            componentRuleType: ComponentRuleType.CONDITION,
            componentRuleCondition: {
              test: {
                binder: ConditionBinder.AND,
                conditions: [
                  {
                    firstVariableType: VariableType.DEPENDENCY,
                    firstVariable: ComponentDependencyType.AREA,
                    comparisionType: ComparisionType.LESS_THAN,
                    secondVariableType: VariableType.NUMBER,
                    secondVariable: 16,
                  },
                ],
              },
              ifTrueType: VariableType.NUMBER,
              ifTrue: 1,
              ifFalseType: VariableType.NUMBER,
              ifFalse: 2,
            },
          },
          {
            component: {
              componentGroup: 'Labour',
              componentName: 'labourMinimum',
            },
            componentRuleType: ComponentRuleType.CONDITION,
            componentRuleCondition: {
              test: {
                binder: ConditionBinder.AND,
                conditions: [
                  {
                    firstVariableType: VariableType.COMPONENT,
                    firstVariable: {
                      componentGroup: 'Labour',
                      componentName: 'labourMinimum',
                    },
                    comparisionType: ComparisionType.GREATER_THAN,
                    secondVariableType: VariableType.FORMULA,
                    secondVariable: {
                      rounding: Rounding.NONE,
                      firstVariableType: VariableType.COMPONENT,
                      firstVariable: {
                        componentGroup: 'Labour',
                        componentName: 'labourHourRate',
                      },
                      operator: FormulaOpertor.MULTIPLY_BY,
                      secondVariableType: VariableType.DEPENDENCY,
                      secondVariable: ComponentDependencyType.AREA,
                    },
                  },
                ],
              },
              ifTrueType: VariableType.NUMBER,
              ifTrue: 1,
              ifFalseType: VariableType.NUMBER,
              ifFalse: 0,
            },
          },
          {
            component: {
              componentGroup: 'Labour',
              componentName: 'labourHourRate',
            },
            componentRuleType: ComponentRuleType.CONDITION,
            componentRuleCondition: {
              test: {
                binder: ConditionBinder.AND,
                conditions: [
                  {
                    firstVariableType: VariableType.COMPONENT,
                    firstVariable: {
                      componentGroup: 'Labour',
                      componentName: 'labourMinimum',
                    },
                    comparisionType: ComparisionType.GREATER_THAN,
                    secondVariableType: VariableType.FORMULA,
                    secondVariable: {
                      rounding: Rounding.NONE,
                      firstVariableType: VariableType.COMPONENT,
                      firstVariable: {
                        componentGroup: 'Labour',
                        componentName: 'labourHourRate',
                      },
                      operator: FormulaOpertor.MULTIPLY_BY,
                      secondVariableType: VariableType.DEPENDENCY,
                      secondVariable: ComponentDependencyType.AREA,
                    },
                  },
                ],
              },
              ifTrueType: VariableType.NUMBER,
              ifTrue: 0,
              ifFalseType: VariableType.DEPENDENCY,
              ifFalse: ComponentDependencyType.AREA,
            },
          },
        ],
      },
      {
        productName: 'Aluminium IBR',
        margin: 0.35,
        components: [
          {
            component: {
              componentGroup: 'Aluminium',
              componentName: 'ibrSheet',
            },
            componentRuleType: ComponentRuleType.FORMULA,
            componentRuleFormula: {
              rounding: Rounding.NONE,
              firstVariableType: VariableType.FORMULA,
              firstVariable: {
                rounding: Rounding.ROUND_UP,
                firstVariableType: VariableType.FORMULA,
                firstVariable: {
                  rounding: Rounding.NONE,
                  firstVariableType: VariableType.NUMBER,
                  firstVariable: 3,
                  operator: FormulaOpertor.MULTIPLY_BY,
                  secondVariableType: VariableType.FORMULA,
                  secondVariable: {
                    rounding: Rounding.NONE,
                    firstVariableType: VariableType.DEPENDENCY,
                    firstVariable: ComponentDependencyType.WIDTH,
                    operator: FormulaOpertor.DIVIDE_BY,
                    secondVariableType: VariableType.NUMBER,
                    secondVariable: 2,
                  },
                },
                operator: FormulaOpertor.DIVIDE_BY,
                secondVariableType: VariableType.NUMBER,
                secondVariable: 1000,
              },
              operator: FormulaOpertor.MULTIPLY_BY,
              secondVariableType: VariableType.FORMULA,
              secondVariable: {
                rounding: Rounding.NONE,
                firstVariableType: VariableType.DEPENDENCY,
                firstVariable: ComponentDependencyType.PROJECTION,
                operator: FormulaOpertor.DIVIDE_BY,
                secondVariableType: VariableType.NUMBER,
                secondVariable: 1000,
              },
            },
          },
          {
            component: {
              componentGroup: 'Aluminium',
              componentName: 'ibrBeam',
            },
            componentRuleType: ComponentRuleType.CONDITION,
            componentRuleCondition: {
              test: {
                binder: ConditionBinder.AND,
                conditions: [
                  {
                    firstVariableType: VariableType.DEPENDENCY,
                    firstVariable: ComponentDependencyType.WIDTH,
                    comparisionType: ComparisionType.LESS_THAN,
                    secondVariableType: VariableType.NUMBER,
                    secondVariable: 3000,
                  },
                  {
                    firstVariableType: VariableType.DEPENDENCY,
                    firstVariable: ComponentDependencyType.PROJECTION,
                    comparisionType: ComparisionType.LESS_THAN,
                    secondVariableType: VariableType.NUMBER,
                    secondVariable: 4000,
                  },
                ],
              },
              ifTrueType: VariableType.NUMBER,
              ifTrue: 0,
              ifFalseType: VariableType.CONDITION,
              ifFalse: {
                test: {
                  binder: ConditionBinder.AND,
                  conditions: [
                    {
                      firstVariableType: VariableType.DEPENDENCY,
                      firstVariable: ComponentDependencyType.WIDTH,
                      comparisionType: ComparisionType.LESS_THAN,
                      secondVariableType: VariableType.NUMBER,
                      secondVariable: 4500,
                    },
                    {
                      firstVariableType: VariableType.DEPENDENCY,
                      firstVariable: ComponentDependencyType.PROJECTION,
                      comparisionType: ComparisionType.LESS_THAN,
                      secondVariableType: VariableType.NUMBER,
                      secondVariable: 3000,
                    },
                  ],
                },
                ifTrueType: VariableType.NUMBER,
                ifTrue: 0,
                ifFalseType: VariableType.NUMBER,
                ifFalse: 1,
              },
            },
          },
          {
            component: {
              componentGroup: 'Aluminium',
              componentName: 'gutter',
            },
            componentRuleType: ComponentRuleType.FORMULA,
            componentRuleFormula: {
              rounding: Rounding.NONE,
              firstVariableType: VariableType.DEPENDENCY,
              firstVariable: ComponentDependencyType.PERIMETER,
              operator: FormulaOpertor.ADD,
              secondVariableType: VariableType.NUMBER,
              secondVariable: 0.8,
            },
          },
          {
            component: {
              componentGroup: 'Labour',
              componentName: 'labourMinimum',
            },
            componentRuleType: ComponentRuleType.CONDITION,
            componentRuleCondition: {
              test: {
                binder: ConditionBinder.AND,
                conditions: [
                  {
                    firstVariableType: VariableType.COMPONENT,
                    firstVariable: {
                      componentGroup: 'Labour',
                      componentName: 'labourMinimum',
                    },
                    comparisionType: ComparisionType.GREATER_THAN,
                    secondVariableType: VariableType.FORMULA,
                    secondVariable: {
                      rounding: Rounding.NONE,
                      firstVariableType: VariableType.COMPONENT,
                      firstVariable: {
                        componentGroup: 'Labour',
                        componentName: 'labourHourRate',
                      },
                      operator: FormulaOpertor.MULTIPLY_BY,
                      secondVariableType: VariableType.DEPENDENCY,
                      secondVariable: ComponentDependencyType.AREA,
                    },
                  },
                ],
              },
              ifTrueType: VariableType.NUMBER,
              ifTrue: 1,
              ifFalseType: VariableType.NUMBER,
              ifFalse: 0,
            },
          },
          {
            component: {
              componentGroup: 'Labour',
              componentName: 'labourHourRate',
            },
            componentRuleType: ComponentRuleType.CONDITION,
            componentRuleCondition: {
              test: {
                binder: ConditionBinder.AND,
                conditions: [
                  {
                    firstVariableType: VariableType.COMPONENT,
                    firstVariable: {
                      componentGroup: 'Labour',
                      componentName: 'labourMinimum',
                    },
                    comparisionType: ComparisionType.GREATER_THAN,
                    secondVariableType: VariableType.FORMULA,
                    secondVariable: {
                      rounding: Rounding.NONE,
                      firstVariableType: VariableType.COMPONENT,
                      firstVariable: {
                        componentGroup: 'Labour',
                        componentName: 'labourHourRate',
                      },
                      operator: FormulaOpertor.MULTIPLY_BY,
                      secondVariableType: VariableType.DEPENDENCY,
                      secondVariable: ComponentDependencyType.AREA,
                    },
                  },
                ],
              },
              ifTrueType: VariableType.NUMBER,
              ifTrue: 0,
              ifFalseType: VariableType.DEPENDENCY,
              ifFalse: ComponentDependencyType.AREA,
            },
          },
        ],
      },
      {
        productName: 'Chromedek Lourve',
        margin: 0.35,
        components: [
          {
            component: {
              componentGroup: 'Chromedek',
              componentName: 'lourvePanel',
            },
            componentRuleType: ComponentRuleType.FORMULA,
            componentRuleFormula: {
              rounding: Rounding.ROUND_UP,
              firstVariableType: VariableType.DEPENDENCY,
              firstVariable: ComponentDependencyType.AREA,
              operator: FormulaOpertor.MULTIPLY_BY,
              secondVariableType: VariableType.NUMBER,
              secondVariable: 7.5,
            },
          },
          {
            component: {
              componentGroup: 'Chromedek',
              componentName: 'lourveCarrier',
            },
            componentRuleType: ComponentRuleType.CONDITION,
            componentRuleCondition: {
              test: {
                binder: ConditionBinder.AND,
                conditions: [
                  {
                    firstVariableType: VariableType.DEPENDENCY,
                    firstVariable: ComponentDependencyType.WIDTH,
                    comparisionType: ComparisionType.LESS_THAN,
                    secondVariableType: VariableType.NUMBER,
                    secondVariable: 3000,
                  },
                ],
              },
              ifTrueType: VariableType.FORMULA,
              ifTrue: {
                rounding: Rounding.NONE,
                firstVariableType: VariableType.DEPENDENCY,
                firstVariable: ComponentDependencyType.PROJECTION,
                operator: FormulaOpertor.DIVIDE_BY,
                secondVariableType: VariableType.NUMBER,
                secondVariable: 500,
              },
              ifFalseType: VariableType.CONDITION,
              ifFalse: {
                test: {
                  binder: ConditionBinder.AND,
                  conditions: [
                    {
                      firstVariableType: VariableType.DEPENDENCY,
                      firstVariable: ComponentDependencyType.WIDTH,
                      comparisionType: ComparisionType.EQUAL_TO,
                      secondVariableType: VariableType.NUMBER,
                      secondVariable: 3000,
                    },
                  ],
                },
                ifTrueType: VariableType.CONDITION,
                ifTrue: {
                  test: {
                    binder: ConditionBinder.AND,
                    conditions: [
                      {
                        firstVariableType: VariableType.DEPENDENCY,
                        firstVariable: ComponentDependencyType.PROJECTION,
                        comparisionType: ComparisionType.GREATER_THAN,
                        secondVariableType: VariableType.NUMBER,
                        secondVariable: 3500,
                      },
                    ],
                  },
                  ifTrueType: VariableType.FORMULA,
                  ifTrue: {
                    rounding: Rounding.ROUND,
                    firstVariableType: VariableType.DEPENDENCY,
                    firstVariable: ComponentDependencyType.PROJECTION,
                    operator: FormulaOpertor.DIVIDE_BY,
                    secondVariableType: VariableType.NUMBER,
                    secondVariable: 333,
                  },
                  ifFalseType: VariableType.FORMULA,
                  ifFalse: {
                    rounding: Rounding.ROUND,
                    firstVariableType: VariableType.DEPENDENCY,
                    firstVariable: ComponentDependencyType.PROJECTION,
                    operator: FormulaOpertor.DIVIDE_BY,
                    secondVariableType: VariableType.NUMBER,
                    secondVariable: 500,
                  },
                },
                ifFalseType: VariableType.FORMULA,
                ifFalse: {
                  rounding: Rounding.NONE,
                  firstVariableType: VariableType.DEPENDENCY,
                  firstVariable: ComponentDependencyType.PROJECTION,
                  operator: FormulaOpertor.DIVIDE_BY,
                  secondVariableType: VariableType.NUMBER,
                  secondVariable: 333,
                },
              },
            },
          },
          {
            component: {
              componentGroup: 'Chromedek',
              componentName: 'lourveBeam',
            },
            componentRuleType: ComponentRuleType.CONDITION,
            componentRuleCondition: {
              test: {
                binder: ConditionBinder.AND,
                conditions: [
                  {
                    firstVariableType: VariableType.DEPENDENCY,
                    firstVariable: ComponentDependencyType.WIDTH,
                    comparisionType: ComparisionType.LESS_THAN,
                    secondVariableType: VariableType.NUMBER,
                    secondVariable: 4500,
                  },
                  {
                    firstVariableType: VariableType.DEPENDENCY,
                    firstVariable: ComponentDependencyType.PROJECTION,
                    comparisionType: ComparisionType.LESS_THAN,
                    secondVariableType: VariableType.NUMBER,
                    secondVariable: 3000,
                  },
                ],
              },
              ifTrueType: VariableType.NUMBER,
              ifTrue: 0,
              ifFalseType: VariableType.NUMBER,
              ifFalse: 1,
            },
          },
          {
            component: {
              componentGroup: 'Chromedek',
              componentName: 'gutter',
            },
            componentRuleType: ComponentRuleType.FORMULA,
            componentRuleFormula: {
              rounding: Rounding.NONE,
              firstVariableType: VariableType.DEPENDENCY,
              firstVariable: ComponentDependencyType.PERIMETER,
              operator: FormulaOpertor.ADD,
              secondVariableType: VariableType.NUMBER,
              secondVariable: 0.8,
            },
          },
          {
            component: {
              componentGroup: 'Gearboxes',
              componentName: 'gearbox',
            },
            componentRuleType: ComponentRuleType.CONDITION,
            componentRuleCondition: {
              test: {
                binder: ConditionBinder.AND,
                conditions: [
                  {
                    firstVariableType: VariableType.DEPENDENCY,
                    firstVariable: ComponentDependencyType.AREA,
                    comparisionType: ComparisionType.LESS_THAN,
                    secondVariableType: VariableType.NUMBER,
                    secondVariable: 16,
                  },
                ],
              },
              ifTrueType: VariableType.NUMBER,
              ifTrue: 1,
              ifFalseType: VariableType.NUMBER,
              ifFalse: 2,
            },
          },
          {
            component: {
              componentGroup: 'Gearboxes',
              componentName: 'crankHandle',
            },
            componentRuleType: ComponentRuleType.CONDITION,
            componentRuleCondition: {
              test: {
                binder: ConditionBinder.AND,
                conditions: [
                  {
                    firstVariableType: VariableType.DEPENDENCY,
                    firstVariable: ComponentDependencyType.AREA,
                    comparisionType: ComparisionType.LESS_THAN,
                    secondVariableType: VariableType.NUMBER,
                    secondVariable: 16,
                  },
                ],
              },
              ifTrueType: VariableType.NUMBER,
              ifTrue: 1,
              ifFalseType: VariableType.NUMBER,
              ifFalse: 2,
            },
          },
          {
            component: {
              componentGroup: 'Labour',
              componentName: 'labourMinimum',
            },
            componentRuleType: ComponentRuleType.CONDITION,
            componentRuleCondition: {
              test: {
                binder: ConditionBinder.AND,
                conditions: [
                  {
                    firstVariableType: VariableType.COMPONENT,
                    firstVariable: {
                      componentGroup: 'Labour',
                      componentName: 'labourMinimum',
                    },
                    comparisionType: ComparisionType.GREATER_THAN,
                    secondVariableType: VariableType.FORMULA,
                    secondVariable: {
                      rounding: Rounding.NONE,
                      firstVariableType: VariableType.COMPONENT,
                      firstVariable: {
                        componentGroup: 'Labour',
                        componentName: 'labourHourRate',
                      },
                      operator: FormulaOpertor.MULTIPLY_BY,
                      secondVariableType: VariableType.DEPENDENCY,
                      secondVariable: ComponentDependencyType.AREA,
                    },
                  },
                ],
              },
              ifTrueType: VariableType.NUMBER,
              ifTrue: 1,
              ifFalseType: VariableType.NUMBER,
              ifFalse: 0,
            },
          },
          {
            component: {
              componentGroup: 'Labour',
              componentName: 'labourHourRate',
            },
            componentRuleType: ComponentRuleType.CONDITION,
            componentRuleCondition: {
              test: {
                binder: ConditionBinder.AND,
                conditions: [
                  {
                    firstVariableType: VariableType.COMPONENT,
                    firstVariable: {
                      componentGroup: 'Labour',
                      componentName: 'labourMinimum',
                    },
                    comparisionType: ComparisionType.GREATER_THAN,
                    secondVariableType: VariableType.FORMULA,
                    secondVariable: {
                      rounding: Rounding.NONE,
                      firstVariableType: VariableType.COMPONENT,
                      firstVariable: {
                        componentGroup: 'Labour',
                        componentName: 'labourHourRate',
                      },
                      operator: FormulaOpertor.MULTIPLY_BY,
                      secondVariableType: VariableType.DEPENDENCY,
                      secondVariable: ComponentDependencyType.AREA,
                    },
                  },
                ],
              },
              ifTrueType: VariableType.NUMBER,
              ifTrue: 0,
              ifFalseType: VariableType.DEPENDENCY,
              ifFalse: ComponentDependencyType.AREA,
            },
          },
        ],
      },
      {
        productName: 'Chromedek IBR',
        margin: 0.35,
        components: [
          {
            component: {
              componentGroup: 'Chromedek',
              componentName: 'ibrSheet',
            },
            componentRuleType: ComponentRuleType.FORMULA,
            componentRuleFormula: {
              rounding: Rounding.NONE,
              firstVariableType: VariableType.FORMULA,
              firstVariable: {
                rounding: Rounding.ROUND_UP,
                firstVariableType: VariableType.FORMULA,
                firstVariable: {
                  rounding: Rounding.NONE,
                  firstVariableType: VariableType.NUMBER,
                  firstVariable: 3,
                  operator: FormulaOpertor.MULTIPLY_BY,
                  secondVariableType: VariableType.FORMULA,
                  secondVariable: {
                    rounding: Rounding.NONE,
                    firstVariableType: VariableType.DEPENDENCY,
                    firstVariable: ComponentDependencyType.WIDTH,
                    operator: FormulaOpertor.DIVIDE_BY,
                    secondVariableType: VariableType.NUMBER,
                    secondVariable: 2,
                  },
                },
                operator: FormulaOpertor.DIVIDE_BY,
                secondVariableType: VariableType.NUMBER,
                secondVariable: 1000,
              },
              operator: FormulaOpertor.MULTIPLY_BY,
              secondVariableType: VariableType.FORMULA,
              secondVariable: {
                rounding: Rounding.NONE,
                firstVariableType: VariableType.DEPENDENCY,
                firstVariable: ComponentDependencyType.PROJECTION,
                operator: FormulaOpertor.DIVIDE_BY,
                secondVariableType: VariableType.NUMBER,
                secondVariable: 1000,
              },
            },
          },
          {
            component: {
              componentGroup: 'Chromedek',
              componentName: 'ibrBeam',
            },
            componentRuleType: ComponentRuleType.CONDITION,
            componentRuleCondition: {
              test: {
                binder: ConditionBinder.AND,
                conditions: [
                  {
                    firstVariableType: VariableType.DEPENDENCY,
                    firstVariable: ComponentDependencyType.WIDTH,
                    comparisionType: ComparisionType.LESS_THAN,
                    secondVariableType: VariableType.NUMBER,
                    secondVariable: 3000,
                  },
                  {
                    firstVariableType: VariableType.DEPENDENCY,
                    firstVariable: ComponentDependencyType.PROJECTION,
                    comparisionType: ComparisionType.LESS_THAN,
                    secondVariableType: VariableType.NUMBER,
                    secondVariable: 4000,
                  },
                ],
              },
              ifTrueType: VariableType.NUMBER,
              ifTrue: 0,
              ifFalseType: VariableType.CONDITION,
              ifFalse: {
                test: {
                  binder: ConditionBinder.AND,
                  conditions: [
                    {
                      firstVariableType: VariableType.DEPENDENCY,
                      firstVariable: ComponentDependencyType.WIDTH,
                      comparisionType: ComparisionType.LESS_THAN,
                      secondVariableType: VariableType.NUMBER,
                      secondVariable: 4500,
                    },
                    {
                      firstVariableType: VariableType.DEPENDENCY,
                      firstVariable: ComponentDependencyType.PROJECTION,
                      comparisionType: ComparisionType.LESS_THAN,
                      secondVariableType: VariableType.NUMBER,
                      secondVariable: 3000,
                    },
                  ],
                },
                ifTrueType: VariableType.NUMBER,
                ifTrue: 0,
                ifFalseType: VariableType.NUMBER,
                ifFalse: 1,
              },
            },
          },
          {
            component: {
              componentGroup: 'Chromedek',
              componentName: 'gutter',
            },
            componentRuleType: ComponentRuleType.FORMULA,
            componentRuleFormula: {
              rounding: Rounding.NONE,
              firstVariableType: VariableType.DEPENDENCY,
              firstVariable: ComponentDependencyType.PERIMETER,
              operator: FormulaOpertor.ADD,
              secondVariableType: VariableType.NUMBER,
              secondVariable: 0.8,
            },
          },
          {
            component: {
              componentGroup: 'Labour',
              componentName: 'labourMinimum',
            },
            componentRuleType: ComponentRuleType.CONDITION,
            componentRuleCondition: {
              test: {
                binder: ConditionBinder.AND,
                conditions: [
                  {
                    firstVariableType: VariableType.COMPONENT,
                    firstVariable: {
                      componentGroup: 'Labour',
                      componentName: 'labourMinimum',
                    },
                    comparisionType: ComparisionType.GREATER_THAN,
                    secondVariableType: VariableType.FORMULA,
                    secondVariable: {
                      rounding: Rounding.NONE,
                      firstVariableType: VariableType.COMPONENT,
                      firstVariable: {
                        componentGroup: 'Labour',
                        componentName: 'labourHourRate',
                      },
                      operator: FormulaOpertor.MULTIPLY_BY,
                      secondVariableType: VariableType.DEPENDENCY,
                      secondVariable: ComponentDependencyType.AREA,
                    },
                  },
                ],
              },
              ifTrueType: VariableType.NUMBER,
              ifTrue: 1,
              ifFalseType: VariableType.NUMBER,
              ifFalse: 0,
            },
          },
          {
            component: {
              componentGroup: 'Labour',
              componentName: 'labourHourRate',
            },
            componentRuleType: ComponentRuleType.CONDITION,
            componentRuleCondition: {
              test: {
                binder: ConditionBinder.AND,
                conditions: [
                  {
                    firstVariableType: VariableType.COMPONENT,
                    firstVariable: {
                      componentGroup: 'Labour',
                      componentName: 'labourMinimum',
                    },
                    comparisionType: ComparisionType.GREATER_THAN,
                    secondVariableType: VariableType.FORMULA,
                    secondVariable: {
                      rounding: Rounding.NONE,
                      firstVariableType: VariableType.COMPONENT,
                      firstVariable: {
                        componentGroup: 'Labour',
                        componentName: 'labourHourRate',
                      },
                      operator: FormulaOpertor.MULTIPLY_BY,
                      secondVariableType: VariableType.DEPENDENCY,
                      secondVariable: ComponentDependencyType.AREA,
                    },
                  },
                ],
              },
              ifTrueType: VariableType.NUMBER,
              ifTrue: 0,
              ifFalseType: VariableType.DEPENDENCY,
              ifFalse: ComponentDependencyType.AREA,
            },
          },
        ],
      },
    ],
  },
];
