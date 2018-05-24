const Graph = require('node-dijkstra');
const redRoute = new Graph();
redRoute.addNode("AA", { AB: 1, BA: 1 })
redRoute.addNode("AB", { AA: 1, AC: 1, BB: 1 })
redRoute.addNode("AC", { AB: 1, AD: 1, BB: 1 })
redRoute.addNode("AD", { AC: 1, BE: 1, HB: 1 })
redRoute.addNode("AE", { AL: 1, HA: 1, HC: 1 })
redRoute.addNode("AF", { AG: 1, GY: 1 })
redRoute.addNode("AG", { AF: 1, AH: 1 })
redRoute.addNode("AH", { AG: 1, AI: 1, AP: 1 })
redRoute.addNode("AI", { AH: 1, AJ: 1 })
redRoute.addNode("AJ", { AI: 1, AK: 1, AO: 1 })
redRoute.addNode("AK", { AJ: 1, AR: 1, AZ: 1 })
redRoute.addNode("AL", { AE: 1, AM: 1, AS: 1 })
redRoute.addNode("AM", { AN: 1, AL: 1 })
redRoute.addNode("AN", { AM: 1, AO: 1, AQ: 1 })
redRoute.addNode("AO", { AJ: 1, AN: 1, AP: 1, AR: 1 })
redRoute.addNode("AP", { AH: 1, AO: 1 })
redRoute.addNode("AQ", { AN: 1, AR: 1, AS: 1 })
redRoute.addNode("AR", { AK: 1, AO: 1, AQ: 1, AU: 1 })
redRoute.addNode("AS", { AL: 1, AQ: 1, AT: 1 })
redRoute.addNode("AT", { AS: 1, AU: 1, BL: 1 })
redRoute.addNode("AU", { AR: 1, AT: 1, AV: 1 })
redRoute.addNode("AV", { AU: 1, CB: 1, CE: 1, CD: 100 })
redRoute.addNode("AW", { AX: 1, CE: 1, HE: 1 })
redRoute.addNode("AX", { AW: 1, AY: 1 })
redRoute.addNode("AY", { AX: 1, CN: 1, HH: 1 })
redRoute.addNode("AZ", { AK: 1, CO: 1, HG: 1 })
redRoute.addNode("BA", { AA: 1, BB: 1, BC: 1, DA: 100 })
redRoute.addNode("BB", { AB: 1, AC: 1, BA: 1 })
redRoute.addNode("BC", { BA: 1, BD: 1, BN: 1 })
redRoute.addNode("BD", { BC: 1, BE: 1, BF: 1 })
redRoute.addNode("BE", { AD: 1, BD: 1, BF: 1 })
redRoute.addNode("BF", { BD: 1, BE: 1, BG: 1 })
redRoute.addNode("BG", { BF: 1, BH: 1, BQ: 1 })
redRoute.addNode("BH", { BG: 1, BI: 1, BM: 100 })
redRoute.addNode("BI", { BH: 1, BJ: 1, BT: 1 })
redRoute.addNode("BJ", { BI: 1, BK: 1, BU: 100 })
redRoute.addNode("BK", { BJ: 1, BL: 1, BM: 1 })
redRoute.addNode("BL", { BK: 1, BM: 100, BW: 100, BY: 1 })
redRoute.addNode("BM", { BH: 100, BK: 1, BL: 100 })
redRoute.addNode("BN", { BC: 1, BO: 1, DA: 1 })
redRoute.addNode("BO", { BN: 1, BP: 1, DD: 100 })
redRoute.addNode("BP", { BO: 1, BQ: 1, DH: 100 })
redRoute.addNode("BQ", { BG: 1, BP: 1, BR: 1 })
redRoute.addNode("BR", { BQ: 1, BS: 1, DJ: 100 })
redRoute.addNode("BS", { BR: 1, BT: 100, BU: 1, DK: 100 })
redRoute.addNode("BT", { BI: 1, BS: 100 })
redRoute.addNode("BU", { BJ: 100, BS: 1, BV: 1 })
redRoute.addNode("BV", { BU: 1, BW: 1, DM: 100 })
redRoute.addNode("BW", { BL: 100, BV: 1, BX: 1, EG: 100 })
redRoute.addNode("BX", { BW: 1, BY: 1000, BZ: 1, EI: 100 })
redRoute.addNode("BY", { BL: 1, BX: 1000, CA: 1 })
redRoute.addNode("BZ", { BX: 1, CA: 100, CC: 1, EM: 100 })
redRoute.addNode("CA", { BY: 1, BZ: 100, CB: 1 })
redRoute.addNode("CB", { AV: 1, CA: 1, CC: 100 })
redRoute.addNode("CC", { BZ: 1, CB: 100, CD: 1, EN: 100 })
redRoute.addNode("CD", { AV: 100, CC: 1, CF: 1, EW: 100 })
redRoute.addNode("CE", { AV: 1, AW: 1, CF: 100, CH: 100 })
redRoute.addNode("CF", { CD: 1, CE: 100, CG: 1, EU: 100 })
redRoute.addNode("CG", { CF: 1, CH: 100, CI: 1, ET: 100 })
redRoute.addNode("CH", { CE: 100, CG: 100, CJ: 100 })
redRoute.addNode("CI", { CG: 1, CJ: 1, ES: 100 })
redRoute.addNode("CJ", { CH: 100, CI: 1, CK: 1 })
redRoute.addNode("CK", { CJ: 1, CL: 100, CQ: 100 })
redRoute.addNode("CL", { CK: 100, CM: 1, HD: 1 })
redRoute.addNode("CM", { CL: 1, CP: 100 })
redRoute.addNode("CN", { AY: 1, CP: 1, CO: 1 })
redRoute.addNode("CO", { AZ: 1, CN: 1, GX: 3 })
redRoute.addNode("CP", { CM: 100, CN: 1, GX: 1 })
redRoute.addNode("CQ", { CK: 100, CR: 100, ES: 1 })
redRoute.addNode("CR", { CQ: 100, CS: 100 })
redRoute.addNode("CS", { CR: 100, CT: 100, CZ: 1 })
redRoute.addNode("CT", { CS: 100, CU: 100, CY: 1 })
redRoute.addNode("CU", { CT: 100, CV: 1, CX: 1, FE: 1 })
redRoute.addNode("CV", { CU: 1, CW: 1, FC: 1 })
redRoute.addNode("CW", { CV: 1, CX: 1, EZ: 1 })
redRoute.addNode("CX", { CU: 1, CW: 1, CY: 1 })
redRoute.addNode("CY", { CT: 1, CX: 1, CZ: 1 })
redRoute.addNode("CZ", { CS: 1, CY: 1, FB: 1 })
redRoute.addNode("DA", { BA: 100, BN: 1, DB: 1 })
redRoute.addNode("DB", { DA: 1, DC: 1, DE: 1 })
redRoute.addNode("DC", { DB: 1, GA: 100 })
redRoute.addNode("DD", { BO: 100, DE: 1, DH: 1 })
redRoute.addNode("DE", { DB: 1, DD: 1, DF: 1 })
redRoute.addNode("DF", { DE: 1, DG: 1 })
redRoute.addNode("DG", { DF: 1, DP: 1 })
redRoute.addNode("DH", { BP: 100, DD: 1, DI: 1 })
redRoute.addNode("DI", { DH: 1, DJ: 1, DR: 1 })
redRoute.addNode("DJ", { BR: 100, DI: 1, DK: 1 })
redRoute.addNode("DK", { BS: 100, DJ: 1, DL: 1, DS: 1 })
redRoute.addNode("DL", { DK: 1, DM: 1, DU: 1 })
redRoute.addNode("DM", { BY: 100, DL: 1, DN: 1 })
redRoute.addNode("DN", { DM: 1, DO: 1, DV: 1 })
redRoute.addNode("DO", { DN: 1, EB: 1, EG: 1 })
redRoute.addNode("DP", { DG: 1, DQ: 1, GB: 1 })
redRoute.addNode("DQ", { DP: 1, DR: 1, DW: 1 })
redRoute.addNode("DR", { DI: 1, DQ: 1, DT: 1 })
redRoute.addNode("DS", { DK: 1, DT: 1 })
redRoute.addNode("DT", { DR: 1, DS: 1, DU: 1, DX: 1 })
redRoute.addNode("DU", { DL: 1, DT: 1, DV: 1 })
redRoute.addNode("DV", { DN: 1, DU: 1, DY: 1 })
redRoute.addNode("DW", { DQ: 1, DX: 1, GC: 1 })
redRoute.addNode("DX", { DT: 1, DW: 1, DY: 1, GW: 1 })
redRoute.addNode("DY", { DV: 1, DX: 1, DZ: 1 })
redRoute.addNode("DZ", { DY: 1, EA: 1, GW: 1 })
redRoute.addNode("EA", { DZ: 1, EB: 100, EC: 1 })
redRoute.addNode("EB", { DO: 1, EA: 100 })
redRoute.addNode("EC", { EA: 1, ED: 1, GT: 100 })
redRoute.addNode("ED", { EC: 1, EE: 100, GU: 100 })
redRoute.addNode("EE", { ED: 100, EF: 100, EJ: 1 })
redRoute.addNode("EF", { EE: 100, EH: 1 })
redRoute.addNode("EG", { BW: 100, DO: 1, EH: 1 })
redRoute.addNode("EH", { EF: 1, EG: 1, EI: 1 })
redRoute.addNode("EI", { BX: 100, EH: 1, EJ: 100, EK: 1 })
redRoute.addNode("EJ", { EE: 1, EI: 100, EL: 1 })
redRoute.addNode("EK", { EI: 1, EL: 100, EM: 1 })
redRoute.addNode("EL", { EJ: 1, EK: 100, EO: 100, GV: 100 })
redRoute.addNode("EM", { BZ: 100, EK: 1, EN: 1 })
redRoute.addNode("EN", { CC: 100, EM: 1, EV: 1 })
redRoute.addNode("EO", { EL: 100, EP: 1, EV: 1 })
redRoute.addNode("EP", { EO: 1, EQ: 1 })
redRoute.addNode("EQ", { EP: 1, ER: 1 })
redRoute.addNode("ER", { EQ: 1, ES: 1 })
redRoute.addNode("ES", { CI: 100, CQ: 1, ER: 1, ET: 1 })
redRoute.addNode("ET", { CG: 100, ES: 1, EU: 1 })
redRoute.addNode("EU", { CF: 100, ET: 1, EW: 1 })
redRoute.addNode("EV", { EN: 1, EO: 1, EW: 1 })
redRoute.addNode("EW", { CD: 100, EU: 1, EV: 1 })
redRoute.addNode("EX", { EY: 1, FL: 1, FS: 1 })
redRoute.addNode("EY", { EX: 1, FA: 1, FB: 1 })
redRoute.addNode("EZ", { CW: 1, FA: 1, FB: 1 })
redRoute.addNode("FA", { EY: 1, EZ: 1, FG: 1 })
redRoute.addNode("FB", { CZ: 1, EY: 1, EZ: 1 })
redRoute.addNode("FC", { CV: 1, FD: 1, FF: 1 })
redRoute.addNode("FD", { FC: 1, FE: 1 })
redRoute.addNode("FE", { CU: 1, FD: 1 })
redRoute.addNode("FF", { FC: 1, FG: 1, FI: 1 })
redRoute.addNode("FG", { FA: 1, FF: 1, FH: 1, FL: 1 })
redRoute.addNode("FH", { FG: 1, FI: 1, FK: 1 })
redRoute.addNode("FI", { FF: 1, FH: 1, FJ: 1 })
redRoute.addNode("FJ", { FI: 1, FK: 1, FM: 1 })
redRoute.addNode("FK", { FH: 1, FJ: 1, FL: 1 })
redRoute.addNode("FL", { EX: 1, FG: 1, FK: 1, FR: 1 })
redRoute.addNode("FM", { FJ: 1, FN: 1, FP: 1 })
redRoute.addNode("FN", { FM: 1, FO: 1 })
redRoute.addNode("FO", { FN: 1, FP: 1, FQ: 1, FV: 1, FY: 1 })
redRoute.addNode("FP", { FM: 1, FO: 1, GR: 1 })
redRoute.addNode("FQ", { FO: 1, FR: 1, FU: 1 })
redRoute.addNode("FR", { FL: 1, FQ: 1, FS: 1 })
redRoute.addNode("FS", { EX: 1, FR: 1, FT: 1 })
redRoute.addNode("FT", { FS: 1, FU: 100, GV: 100 })
redRoute.addNode("FU", { FQ: 1, FT: 100, FW: 1 })
redRoute.addNode("FV", { FO: 1, FW: 100 })
redRoute.addNode("FW", { FU: 1, FV: 100, FX: 1, GV: 100 })
redRoute.addNode("FX", { FW: 1, FY: 1, GS: 1 })
redRoute.addNode("FY", { FO: 1, FX: 1, FZ: 1 })
redRoute.addNode("FZ", { FY: 1, GO: 1, GQ: 1 })
redRoute.addNode("GA", { DC: 100, GB: 1 })
redRoute.addNode("GB", { DP: 1, GC: 1 })
redRoute.addNode("GC", { DW: 1, GB: 1, GD: 1 })
redRoute.addNode("GD", { GC: 1, GE: 1000, GW: 1 })
redRoute.addNode("GE", { GD: 1000, GF: 1 })
redRoute.addNode("GF", { GE: 1, GH: 100, GG: 1 })
redRoute.addNode("GG", { GF: 1, GI: 1, GJ: 1 })
redRoute.addNode("GH", { GF: 100, GI: 1, GW: 100 })
redRoute.addNode("GI", { GG: 1, GH: 1, HF: 1 })
redRoute.addNode("GJ", { GG: 1, GK: 1, GL: 1 })
redRoute.addNode("GK", { GJ: 1, GL: 1, GM: 1, HF: 1 })
redRoute.addNode("GL", { GJ: 1, GK: 1, GP: 1 })
redRoute.addNode("GM", { GK: 1, GN: 1 })
redRoute.addNode("GN", { GM: 1, GO: 1, GS: 100 })
redRoute.addNode("GO", { FZ: 1, GN: 1, GP: 1 })
redRoute.addNode("GP", { GL: 1, GO: 1, GQ: 1 })
redRoute.addNode("GQ", { FZ: 1, GP: 1, GR: 1 })
redRoute.addNode("GR", { FP: 1, GQ: 1 })
redRoute.addNode("GS", { FX: 1, GN: 100, GT: 100 })
redRoute.addNode("GT", { EC: 100, GS: 100, GU: 100 })
redRoute.addNode("GU", { ED: 100, GT: 100, GV: 100 })
redRoute.addNode("GV", { EL: 100, FT: 100, FW: 100, GU: 100 })
redRoute.addNode("GW", { DX: 1, DZ: 1, GD: 1, GH: 100 })
redRoute.addNode("GX", { CO: 3, CP: 1 })
redRoute.addNode("GY", { AF: 1, GZ: 1 })
redRoute.addNode("GZ", { GY: 1, HC: 1 })
redRoute.addNode("HA", { AE: 1, HB: 1 })
redRoute.addNode("HB", { HA: 1, AD: 1 })
redRoute.addNode("HC", { GZ: 1, AE: 1 })
redRoute.addNode("HD", { CL: 1, HE: 1 })
redRoute.addNode("HE", { AW: 1, HD: 1 })
redRoute.addNode("HF", { GI: 1, GK: 1 })
redRoute.addNode("HG", { AZ: 1, HH: 1 })
redRoute.addNode("HH", { HG: 1, AY: 1 })

export {redRoute};