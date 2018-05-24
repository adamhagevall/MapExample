const Graph = require('node-dijkstra');
const greenRoute = new Graph();
greenRoute.addNode("AA", { AB: 1, BA: 100 })
greenRoute.addNode("AB", { AA: 1, AC: 1, BB: 1000 })
greenRoute.addNode("AC", { AB: 1, AD: 1, BB: 1000 })
greenRoute.addNode("AD", { AC: 1, BE: 100, HB: 1 })
greenRoute.addNode("AE", { AL: 1, HC: 1, HA: 1 })
greenRoute.addNode("AF", { AG: 1, GY: 1 })
greenRoute.addNode("AG", { AF: 1, AH: 1000 })
greenRoute.addNode("AH", { AG: 1000, AI: 1000, AP: 1000 })
greenRoute.addNode("AI", { AH: 1000, AJ: 1 })
greenRoute.addNode("AJ", { AI: 1, AK: 1, AO: 1 })
greenRoute.addNode("AK", { AJ: 1, AR: 100, AZ: 1 })
greenRoute.addNode("AL", { AE: 1, AM: 100, AS: 100 })
greenRoute.addNode("AM", { AN: 1, AL: 100 })
greenRoute.addNode("AN", { AM: 1, AO: 1000, AQ: 1 })
greenRoute.addNode("AO", { AJ: 1, AN: 1000, AP: 100, AR: 100 })
greenRoute.addNode("AP", { AH: 1000, AO: 100 })
greenRoute.addNode("AQ", { AN: 1, AR: 1, AS: 1 })
greenRoute.addNode("AR", { AK: 100, AO: 100, AQ: 1, AU: 100 })
greenRoute.addNode("AS", { AL: 100, AQ: 1, AT: 100 })
greenRoute.addNode("AT", { AS: 100, AU: 100, BL: 100 })
greenRoute.addNode("AU", { AR: 100, AT: 100, AV: 1000 })
greenRoute.addNode("AV", { AU: 1000, CB: 100, CE: 100, CD: 10000 })
greenRoute.addNode("AW", { AX: 1000, CE: 100, HE: 100 })
greenRoute.addNode("AX", { AW: 1000, AY: 100 })
greenRoute.addNode("AY", { AX: 100, CN: 100, HH: 100 })
greenRoute.addNode("AZ", { AK: 1, CO: 1, HG: 100 })
greenRoute.addNode("BA", { AA: 100, BB: 1000, BC: 100, DA: 10000 })
greenRoute.addNode("BB", { AB: 1000, AC: 1000, BA: 1000 })
greenRoute.addNode("BC", { BA: 100, BD: 1000, BN: 1000 })
greenRoute.addNode("BD", { BC: 1000, BE: 100, BF: 100 })
greenRoute.addNode("BE", { AD: 100, BD: 100, BF: 100 })
greenRoute.addNode("BF", { BD: 100, BE: 100, BG: 100 })
greenRoute.addNode("BG", { BF: 100, BH: 100, BQ: 100 })
greenRoute.addNode("BH", { BG: 100, BI: 100, BM: 10000 })
greenRoute.addNode("BI", { BH: 100, BJ: 100, BT: 1000 })
greenRoute.addNode("BJ", { BI: 100, BK: 1000, BU: 10000 })
greenRoute.addNode("BK", { BJ: 1000, BL: 1000, BM: 100 })
greenRoute.addNode("BL", { AT: 100, BK: 1000, BM: 10000, BW: 10000, BY: 100 })
greenRoute.addNode("BM", { BH: 10000, BK: 100, BL: 10000 })
greenRoute.addNode("BN", { BC: 1000, BO: 100, DA: 10000 })
greenRoute.addNode("BO", { BN: 100, BP: 100, DD: 10000 })
greenRoute.addNode("BP", { BO: 100, BQ: 100, DH: 10000 })
greenRoute.addNode("BQ", { BG: 100, BP: 100, BR: 100})
greenRoute.addNode("BR", { BQ: 100, BS: 100, DJ: 10000 })
greenRoute.addNode("BS", { BR: 100, BT: 10000, BU: 100, DK: 10000 })
greenRoute.addNode("BT", { BI: 1000, BS: 10000 })
greenRoute.addNode("BU", { BJ: 10000, BS: 100, BV: 100})
greenRoute.addNode("BV", { BU: 100, BW: 100, DM: 10000 })
greenRoute.addNode("BW", { BL: 10000, BV: 100, BX: 100, EG: 10000 })
greenRoute.addNode("BX", { BW: 100, BY: 100000, BZ: 100, EI: 10000 })
greenRoute.addNode("BY", { BL: 100, BX: 100000, CA: 100})
greenRoute.addNode("BZ", { BX: 100, CA: 10000, CC: 100, EM: 10000 })
greenRoute.addNode("CA", { BY: 100, BZ: 10000, CB: 100})
greenRoute.addNode("CB", { AV: 100, CA: 100, CC: 10000 })
greenRoute.addNode("CC", { BZ: 100, CB: 10000, CD: 100, EN: 10000 })
greenRoute.addNode("CD", { AV: 10000, CC: 100, CF: 100, EW: 10000 })
greenRoute.addNode("CE", { AV: 100, AW: 100, CF: 10000, CH: 10000 })
greenRoute.addNode("CF", { CD: 100, CE: 10000, CG: 100, EU: 10000 })
greenRoute.addNode("CG", { CF: 100, CH: 10000, CI: 100, ET: 10000 })
greenRoute.addNode("CH", { CE: 10000, CG: 10000, CJ: 10000 })
greenRoute.addNode("CI", { CG: 100, CJ: 100, ES: 10000 })
greenRoute.addNode("CJ", { CH: 10000, CI: 100, CK: 100})
greenRoute.addNode("CK", { CJ: 100, CL: 10000, CQ: 10000 })
greenRoute.addNode("CL", { CK: 10000, CM: 1000, HD: 1000 })
greenRoute.addNode("CM", { CL: 1000, CP: 10000 })
greenRoute.addNode("CN", { AY: 100, CP: 100, CO: 1000 })
greenRoute.addNode("CO", { AZ: 100, CN: 1000, GX: 100})
greenRoute.addNode("CP", { CM: 10000, CN: 100, GX: 100})
greenRoute.addNode("CQ", { CK: 10000, CR: 10000, ES: 100})
greenRoute.addNode("CR", { CQ: 10000, CS: 10000 })
greenRoute.addNode("CS", { CR: 10000, CT: 10000, CZ: 1000 })
greenRoute.addNode("CT", { CS: 10000, CU: 10000, CY: 100})
greenRoute.addNode("CU", { CT: 10000, CV: 100, CX: 100, FE: 100})
greenRoute.addNode("CV", { CU: 100, CW: 100, FC: 100})
greenRoute.addNode("CW", { CV: 100, CX: 100, EZ: 100})
greenRoute.addNode("CX", { CU: 100, CW: 100, CY: 100})
greenRoute.addNode("CY", { CT: 100, CX: 100, CZ: 100})
greenRoute.addNode("CZ", { CS: 1000, CY: 100, FB: 100})
greenRoute.addNode("DA", { BA: 10000, BN: 1000, DB: 1000 })
greenRoute.addNode("DB", { DA: 1000, DC: 1000, DE: 100})
greenRoute.addNode("DC", { DB: 1000, GA: 10000 })
greenRoute.addNode("DD", { BO: 10000, DE: 100, DH: 100})
greenRoute.addNode("DE", { DB: 100, DD: 100, DF: 1000 })
greenRoute.addNode("DF", { DE: 1000, DG: 100})
greenRoute.addNode("DG", { DF: 100, DP: 100})
greenRoute.addNode("DH", { BP: 10000, DD: 100, DI: 100})
greenRoute.addNode("DI", { DH: 100, DJ: 100, DR: 100})
greenRoute.addNode("DJ", { BR: 10000, DI: 100, DK: 100})
greenRoute.addNode("DK", { BS: 10000, DJ: 100, DL: 100, DS: 100})
greenRoute.addNode("DL", { DK: 100, DM: 100, DU: 100})
greenRoute.addNode("DM", { BY: 10000, DL: 100, DN: 100})
greenRoute.addNode("DN", { DM: 100, DO: 100, DV: 100})
greenRoute.addNode("DO", { DN: 100, EB: 1000, EG: 100})
greenRoute.addNode("DP", { DG: 100, DQ: 100, GB: 1000 })
greenRoute.addNode("DQ", { DP: 100, DR: 100, DW: 100})
greenRoute.addNode("DR", { DI: 100, DQ: 100, DT: 100})
greenRoute.addNode("DS", { DK: 100, DT: 1000 })
greenRoute.addNode("DT", { DR: 100, DS: 1000, DU: 100, DX: 100})
greenRoute.addNode("DU", { DL: 100, DT: 100, DV: 100})
greenRoute.addNode("DV", { DN: 100, DU: 100, DY: 100})
greenRoute.addNode("DW", { DQ: 100, DX: 100, GC: 100})
greenRoute.addNode("DX", { DT: 100, DW: 100, DY: 100, GW: 1000 })
greenRoute.addNode("DY", { DV: 100, DX: 100, DZ: 1000 })
greenRoute.addNode("DZ", { DY: 1000, EA: 1000, GW: 100})
greenRoute.addNode("EA", { DZ: 1000, EB: 10000, EC: 1000 })
greenRoute.addNode("EB", { DO: 1000, EA: 10000 })
greenRoute.addNode("EC", { EA: 1000, ED: 1000, GT: 10000 })
greenRoute.addNode("ED", { EC: 1000, EE: 10000, GU: 10000 })
greenRoute.addNode("EE", { ED: 10000, EF: 10000, EJ: 1000 })
greenRoute.addNode("EF", { EE: 10000, EH: 1000 })
greenRoute.addNode("EG", { BW: 10000, DO: 100, EH: 100})
greenRoute.addNode("EH", { EF: 1000, EG: 100, EI: 100})
greenRoute.addNode("EI", { BX: 10000, EH: 100, EJ: 10000, EK: 100})
greenRoute.addNode("EJ", { EE: 1000, EI: 10000, EL: 1000 })
greenRoute.addNode("EK", { EI: 100, EL: 10000, EM: 100})
greenRoute.addNode("EL", { EJ: 1000, EK: 10000, EO: 10000, GV: 10000 })
greenRoute.addNode("EM", { BZ: 10000, EK: 100, EN: 100})
greenRoute.addNode("EN", { CC: 10000, EM: 100, EV: 100})
greenRoute.addNode("EO", { EL: 10000, EP: 100, EV: 1000 })
greenRoute.addNode("EP", { EO: 100, EQ: 1000 })
greenRoute.addNode("EQ", { EP: 1000, ER: 100})
greenRoute.addNode("ER", { EQ: 100, ES: 100})
greenRoute.addNode("ES", { CI: 10000, CQ: 100, ER: 100, ET: 100})
greenRoute.addNode("ET", { CG: 10000, ES: 100, EU: 100})
greenRoute.addNode("EU", { CF: 10000, ET: 100, EW: 1000 })
greenRoute.addNode("EV", { EN: 100, EO: 1000, EW: 1000 })
greenRoute.addNode("EW", { CD: 10000, EU: 1000, EV: 1000 })
greenRoute.addNode("EX", { EY: 100, FL: 100, FS: 100})
greenRoute.addNode("EY", { EX: 100, FA: 100, FB: 100})
greenRoute.addNode("EZ", { CW: 100, FA: 100, FB: 100})
greenRoute.addNode("FA", { EY: 100, EZ: 100, FG: 100})
greenRoute.addNode("FB", { CZ: 100, EY: 100, EZ: 100})
greenRoute.addNode("FC", { CV: 100, FD: 100, FF: 100})
greenRoute.addNode("FD", { FC: 100, FE: 100})
greenRoute.addNode("FE", { CU: 100, FD: 100})
greenRoute.addNode("FF", { FC: 100, FG: 100, FI: 100})
greenRoute.addNode("FG", { FA: 100, FF: 100, FH: 1000, FL: 100})
greenRoute.addNode("FH", { FG: 1000, FI: 1000, FK: 100})
greenRoute.addNode("FI", { FF: 100, FH: 1000, FJ: 100})
greenRoute.addNode("FJ", { FI: 100, FK: 1000, FM: 100})
greenRoute.addNode("FK", { FH: 100, FJ: 1000, FL: 100})
greenRoute.addNode("FL", { EX: 100, FG: 100, FK: 100, FR: 100})
greenRoute.addNode("FM", { FJ: 100, FN: 1000, FP: 100})
greenRoute.addNode("FN", { FM: 1000, FO: 100})
greenRoute.addNode("FO", { FN: 100, FP: 100, FQ: 1000, FV: 100, FY: 100})
greenRoute.addNode("FP", { FM: 100, FO: 100, GR: 100})
greenRoute.addNode("FQ", { FO: 1000, FR: 100, FU: 100})
greenRoute.addNode("FR", { FL: 100, FQ: 100, FS: 1000 })
greenRoute.addNode("FS", { EX: 100, FR: 1000, FT: 100})
greenRoute.addNode("FT", { FS: 100, FU: 10000, GV: 10000 })
greenRoute.addNode("FU", { FQ: 100, FT: 10000, FW: 1000 })
greenRoute.addNode("FV", { FO: 100, FW: 10000 })
greenRoute.addNode("FW", { FU: 1000, FV: 10000, FX: 1000, GV: 10000 })
greenRoute.addNode("FX", { FW: 1000, FY: 1000, GS: 100})
greenRoute.addNode("FY", { FO: 100, FX: 1000, FZ: 100})
greenRoute.addNode("FZ", { FY: 100, GO: 100, GQ: 1000 })
greenRoute.addNode("GA", { DC: 10000, GB: 100})
greenRoute.addNode("GB", { DP: 1000, GC: 100})
greenRoute.addNode("GC", { DW: 100, GB: 100, GD: 1000 })
greenRoute.addNode("GD", { GC: 1000, GE: 100000, GW: 100})
greenRoute.addNode("GE", { GD: 100000, GF: 100})
greenRoute.addNode("GF", { GE: 100, GH: 10000, GG: 100})
greenRoute.addNode("GG", { GF: 100, GI: 1000, GJ: 100})
greenRoute.addNode("GH", { GF: 10000, GI: 100, GW: 10000 })
greenRoute.addNode("GI", { GG: 1000, GH: 100, HF: 100})
greenRoute.addNode("GJ", { GG: 100, GK: 100, GL: 100})
greenRoute.addNode("GK", { GJ: 100, GL: 100, GM: 100, HF: 100})
greenRoute.addNode("GL", { GJ: 100, GK: 100, GP: 100})
greenRoute.addNode("GM", { GK: 100, GN: 1000 })
greenRoute.addNode("GN", { GM: 1000, GO: 1000, GS: 10000 })
greenRoute.addNode("GO", { FZ: 100, GN: 1000, GP: 1000 })
greenRoute.addNode("GP", { GL: 100, GO: 1000, GQ: 100})
greenRoute.addNode("GQ", { FZ: 1000, GP: 100, GR: 100})
greenRoute.addNode("GR", { FP: 100, GQ: 100})
greenRoute.addNode("GS", { FX: 100, GN: 10000, GT: 10000 })
greenRoute.addNode("GT", { EC: 10000, GS: 10000, GU: 10000 })
greenRoute.addNode("GU", { ED: 10000, GT: 10000, GV: 10000 })
greenRoute.addNode("GV", { EL: 10000, FT: 10000, FW: 10000, GU: 10000 })
greenRoute.addNode("GW", { DX: 1000, DZ: 100, GD: 100, GH: 1000000 })
greenRoute.addNode("GX", { CO: 100, CP: 10})
greenRoute.addNode("GX", { CO: 100, CP: 100})
greenRoute.addNode("GY", { AF: 100, GZ: 100})
greenRoute.addNode("GZ", { GY: 100, HC: 100})
greenRoute.addNode("HA", { AE: 100, HB: 100})
greenRoute.addNode("HB", { HA: 100, AD: 100})
greenRoute.addNode("HC", { GZ: 100, AE: 100})
greenRoute.addNode("HD", { CL: 1000, HE: 100})
greenRoute.addNode("HE", { AW: 100, HD: 100})
greenRoute.addNode("HF", { GI: 100, GK: 100})
greenRoute.addNode("HG", { AZ: 100, HH: 100})
greenRoute.addNode("HH", { HG: 100, AY: 100})


export {greenRoute};