export interface Leagues {
  [key: string]: LeagueData;
}

export interface LeagueData {
  leagueName: string;
  seasons: LeagueSeason;
}

export interface LeagueSeason {
  [key: string]: LeagueSeasonData;
}

export interface LeagueSeasonData {
  standings: Array<StandingsData>;
  rounds: Array<RoundsData>;
}

export interface StandingsData {
  driver: string;
  points: number;
}

export interface RoundsData {
  venue: string;
  date: Date;
}

export const testData: Leagues = {
  K8je73NlsJKS: {
    leagueName: 'During Road Karting League',
    seasons: {
      '2022/2023': {
        standings: [
          { driver: 'Ruben', points: 72 },
          { driver: 'Aiden', points: 59 },
          { driver: 'Timon', points: 43 },
          { driver: 'Ryan', points: 33 },
          { driver: 'Bianca', points: 22 },
          { driver: 'Jessica', points: 22 },
        ],
        rounds: [
          {
            venue: 'Indy Kart Indoor Karting @ Clearwater Mall',
            date: new Date('August 19, 2022'),
          },
          { venue: 'JoziKart', date: new Date('August 19, 2022') },
          {
            venue: 'Indy Kart Indoor karting @ Rosebank Mall',
            date: new Date('August 19, 2022'),
          },
          {
            venue: 'Xtreme Indoor Go Karting',
            date: new Date('August 19, 2022'),
          },
          {
            venue: 'Indy Kart Indoor Karting @ Parkview Pretoria',
            date: new Date('August 19, 2022'),
          },
          {
            venue: 'Supakart Indoor Karting',
            date: new Date('August 19, 2022'),
          },
          {
            venue: 'Indy Kart Indoor Karting @ The Glen',
            date: new Date('August 19, 2022'),
          },
          { venue: 'Compu-Kart', date: new Date('August 19, 2022') },
          {
            venue: 'Indy Kart Indoor Karting @ East Gate Mall',
            date: new Date('August 19, 2022'),
          },
          {
            venue: 'Kyalami Indoor Karting',
            date: new Date('August 19, 2022'),
          },
        ],
      },
    },
  },
  K8je73sdfsdS: {
    leagueName: 'Another Karting League',
    seasons: {
      '2022/2023': {
        standings: [
          { driver: 'Bob', points: 12 },
          { driver: 'Bill', points: 2 },
        ],
        rounds: [{ venue: 'JoziKart', date: new Date('August 19, 2022') }],
      },
    },
  },
};
