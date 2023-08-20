export interface ComponentGroup {
  [key: string]: ComponentItem[];
}

export interface ComponentItem {
  name: string;
  displayGeneral: string;
  displayQuotes?: string;
  price: number;
  incVAT: boolean;
}

export const TestComponentList: ComponentGroup = {
  Aluminium: [
    {
      name: 'lourvePanel',
      displayGeneral: 'Lourve Panels (units)',
      price: 82.8,
      incVAT: false,
    },
    {
      name: 'lourveCarrier',
      displayGeneral: 'Lourve Carriers (units)',
      price: 460,
      incVAT: false,
    },
    {
      name: 'lourveBeam',
      displayGeneral: 'Lourve Beams (units)',
      price: 1300,
      incVAT: false,
    },
    {
      name: 'ibrSheet',
      displayGeneral: 'IBR Sheets (meters)',
      price: 241.5,
      incVAT: false,
    },
    {
      name: 'ibrBeam',
      displayGeneral: 'IBR Beam',
      price: 1300,
      incVAT: false,
    },
    {
      name: 'gutter',
      displayGeneral: 'Gutters (meters)',
      price: 175.95,
      incVAT: false,
    },
  ],
  Chromedek: [
    {
      name: 'lourvePanel',
      displayGeneral: 'Lourve Panels (units)',
      price: 66.57,
      incVAT: false,
    },
    {
      name: 'lourveCarrier',
      displayGeneral: 'Lourve Carriers (units)',
      price: 460,
      incVAT: false,
    },
    {
      name: 'lourveBeam',
      displayGeneral: 'Lourve Beams (units)',
      price: 1500,
      incVAT: false,
    },
    {
      name: 'ibrSheet',
      displayGeneral: 'IBR Sheets (meters)',
      price: 170,
      incVAT: false,
    },
    {
      name: 'ibrBeam',
      displayGeneral: 'IBR Beams (units)',
      price: 1500,
      incVAT: false,
    },
    {
      name: 'gutter',
      displayGeneral: 'Gutters (meters)',
      price: 137.31,
      incVAT: false,
    },
  ],
  Gearboxes: [
    {
      name: 'gearbox',
      displayGeneral: 'Gearboxs (units)',
      price: 351.21,
      incVAT: false,
    },
    {
      name: 'crankHandle',
      displayGeneral: 'Crank handles (units)',
      price: 141.45,
      incVAT: false,
    },
  ],
  Labour: [
    {
      name: 'labourMinimum',
      displayGeneral: 'Labour minimum',
      displayQuotes: 'Labour',
      price: 1500,
      incVAT: false,
    },
    {
      name: 'labourHourRate',
      displayGeneral: 'Labour hourly rate',
      displayQuotes: 'Labour',
      price: 180,
      incVAT: false,
    },
  ],
};
