export interface EstimatesBasics {
  targetEntityName: string;
  targetEntityFYE: string;
  targetEntityFinancialHistoryYears: number;
  targetEntityLastFinancialYear: number;
  targetEntityCountry: string;
  targetEntityCurrency: string;
  targetEntityIndustry: string;
  targetEntitySuperSector: string;
  targetEntitySector: string;
  targetEntitySubSector: string;
}

export interface IncompleteEstimatesBasics {
  targetEntityName: boolean;
  targetEntityFYE: boolean;
  targetEntityFinancialHistoryYears: boolean;
  targetEntityLastFinancialYear: boolean;
  targetEntityCountry: boolean;
  targetEntityCurrency: boolean;
  targetEntityIndustry: boolean;
  targetEntitySuperSector: boolean;
  targetEntitySector: boolean;
  targetEntitySubSector: boolean;
}
