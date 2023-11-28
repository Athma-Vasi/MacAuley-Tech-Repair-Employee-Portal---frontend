import { shuffleArray } from '../../../utils';
import { DirectoryUserDocument } from '../../directory/types';

type PrinterIssuesArray = {
  title: string;
  dateOfOccurrence: string;
  timeOfOccurrence: string;
  printerMake: string;
  printerModel: string;
  printerSerialNumber: string;
  printerIssueDescription: string;
  urgency: string;
  additionalInformation: string;
  requestStatus: string;
}[];

const printerIssuesArray: PrinterIssuesArray = [
  {
    title: 'HP LaserJet Error 102',
    dateOfOccurrence: '2023-09-10',
    timeOfOccurrence: '13:45',
    printerMake: 'HP',
    printerModel: 'LaserJet Pro MFP M227fdw',
    printerSerialNumber: 'ABC123456',
    printerIssueDescription:
      'Printer displays Error 102, needs immediate attention.',
    urgency: 'high',
    additionalInformation: 'Printed 100 pages before error occurred.',
    requestStatus: 'pending',
  },
  {
    title: 'Canon PIXMA Color Alignment Issue',
    dateOfOccurrence: '2023-09-12',
    timeOfOccurrence: '09:30',
    printerMake: 'Canon',
    printerModel: 'PIXMA TS8320',
    printerSerialNumber: 'DEF789012',
    printerIssueDescription:
      'Colors are misaligned in prints, affecting quality.',
    urgency: 'medium',
    additionalInformation: 'Issue started after changing ink cartridges.',
    requestStatus: 'approved',
  },
  {
    title: 'Epson EcoTank Ink Leakage',
    dateOfOccurrence: '2023-09-15',
    timeOfOccurrence: '14:20',
    printerMake: 'Epson',
    printerModel: 'EcoTank ET-4760',
    printerSerialNumber: 'GHI345678',
    printerIssueDescription: 'Ink leaking from the printer, causing a mess.',
    urgency: 'high',
    additionalInformation: 'Printer was moved before the issue started.',
    requestStatus: 'pending',
  },
  {
    title: 'Brother Laser Printer Not Powering On',
    dateOfOccurrence: '2023-09-18',
    timeOfOccurrence: '11:10',
    printerMake: 'Brother',
    printerModel: 'HL-L2395DW',
    printerSerialNumber: 'JKL901234',
    printerIssueDescription:
      'Printer is not turning on, no lights or signs of life.',
    urgency: 'high',
    additionalInformation: 'Tried different power outlets with no luck.',
    requestStatus: 'pending',
  },
  {
    title: 'Xerox Phaser Streaking Issue',
    dateOfOccurrence: '2023-09-20',
    timeOfOccurrence: '16:30',
    printerMake: 'Xerox',
    printerModel: 'Phaser 6510',
    printerSerialNumber: 'MNO567890',
    printerIssueDescription:
      'Prints have streaks and lines, affecting print quality.',
    urgency: 'medium',
    additionalInformation:
      'Streaking started after replacing the toner cartridge.',
    requestStatus: 'approved',
  },
  {
    title: 'Ricoh Color Printer Paper Jam',
    dateOfOccurrence: '2023-09-22',
    timeOfOccurrence: '10:55',
    printerMake: 'Ricoh',
    printerModel: 'SP C261DNw',
    printerSerialNumber: 'PQR123456',
    printerIssueDescription:
      'Paper jam in the color printer tray, unable to print.',
    urgency: 'high',
    additionalInformation:
      'Tried to remove jammed paper but need professional help.',
    requestStatus: 'pending',
  },
  {
    title: 'Lexmark Wireless Connection Issue',
    dateOfOccurrence: '2023-09-25',
    timeOfOccurrence: '08:40',
    printerMake: 'Lexmark',
    printerModel: 'MB2236adw',
    printerSerialNumber: 'STU789012',
    printerIssueDescription: 'Unable to connect the printer wirelessly.',
    urgency: 'medium',
    additionalInformation: 'Other devices connect fine to the same network.',
    requestStatus: 'pending',
  },
  {
    title: 'Dell Laser Printer Error Code E525w',
    dateOfOccurrence: '2023-09-28',
    timeOfOccurrence: '15:15',
    printerMake: 'Dell',
    printerModel: 'E525w',
    printerSerialNumber: 'VWX123456',
    printerIssueDescription:
      'Error code E525w is displayed on the printer screen.',
    urgency: 'medium',
    additionalInformation:
      'Restarted the printer multiple times, error persists.',
    requestStatus: 'pending',
  },
  {
    title: 'Kyocera Print Quality Degradation',
    dateOfOccurrence: '2023-10-01',
    timeOfOccurrence: '12:20',
    printerMake: 'Kyocera',
    printerModel: 'ECOSYS P3055dn',
    printerSerialNumber: 'YZA789012',
    printerIssueDescription:
      'Print quality has deteriorated, text is faint and blurry.',
    urgency: 'medium',
    additionalInformation:
      'Tried cleaning the print heads with no improvement.',
    requestStatus: 'pending',
  },
  {
    title: 'Sharp Multifunction Printer Offline',
    dateOfOccurrence: '2023-10-04',
    timeOfOccurrence: '09:00',
    printerMake: 'Sharp',
    printerModel: 'MX-3070N',
    printerSerialNumber: 'BCD123456',
    printerIssueDescription: 'Printer is offline, unable to print or scan.',
    urgency: 'high',
    additionalInformation:
      'All cables are securely connected, but still offline.',
    requestStatus: 'pending',
  },
  {
    title: 'Konica Minolta Paper Feeder Jam',
    dateOfOccurrence: '2023-10-07',
    timeOfOccurrence: '14:50',
    printerMake: 'Konica Minolta',
    printerModel: 'bizhub C258',
    printerSerialNumber: 'EFG789012',
    printerIssueDescription:
      'Paper feeder jam, paper stuck inside the printer.',
    urgency: 'high',
    additionalInformation: 'Need assistance to clear the paper jam.',
    requestStatus: 'pending',
  },
  {
    title: 'Toshiba TEC Printer Not Responding',
    dateOfOccurrence: '2023-10-10',
    timeOfOccurrence: '11:30',
    printerMake: 'Toshiba TEC',
    printerModel: 'B-EX4T2-HS',
    printerSerialNumber: 'HIJ123456',
    printerIssueDescription: 'Printer is not responding to print commands.',
    urgency: 'high',
    additionalInformation: 'Checked network connections, still not working.',
    requestStatus: 'pending',
  },
  {
    title: 'OKI Color Printer Color Misalignment',
    dateOfOccurrence: '2023-10-13',
    timeOfOccurrence: '16:10',
    printerMake: 'OKI',
    printerModel: 'C532dn',
    printerSerialNumber: 'KLM567890',
    printerIssueDescription:
      'Colors are misaligned in prints, affecting quality.',
    urgency: 'medium',
    additionalInformation: 'Print quality was fine until this issue.',
    requestStatus: 'pending',
  },
  {
    title: 'Panasonic Laser Printer Error Code E02',
    dateOfOccurrence: '2023-10-16',
    timeOfOccurrence: '10:05',
    printerMake: 'Panasonic',
    printerModel: 'KX-MB2061',
    printerSerialNumber: 'NOP123456',
    printerIssueDescription:
      'Error code E02 is displayed on the printer screen.',
    urgency: 'medium',
    additionalInformation:
      'No documentation about this error code in the manual.',
    requestStatus: 'pending',
  },
  {
    title: 'Fujitsu Scanner Feeder Jam',
    dateOfOccurrence: '2023-10-19',
    timeOfOccurrence: '08:15',
    printerMake: 'Fujitsu',
    printerModel: 'fi-7160',
    printerSerialNumber: 'QRS789012',
    printerIssueDescription:
      'Scanner feeder is jammed, unable to scan documents.',
    urgency: 'high',
    additionalInformation:
      'Important documents stuck in the feeder, need urgent help.',
    requestStatus: 'pending',
  },
  {
    title: 'Zebra Technologies Label Printer Not Printing',
    dateOfOccurrence: '2023-10-22',
    timeOfOccurrence: '13:55',
    printerMake: 'Zebra Technologies',
    printerModel: 'GC420t',
    printerSerialNumber: 'STU123456',
    printerIssueDescription:
      "Label printer is not printing labels, it's stuck.",
    urgency: 'high',
    additionalInformation:
      'Production line is halted due to this issue, need immediate assistance.',
    requestStatus: 'pending',
  },
  {
    title: 'Epson WorkForce Pro WF-3720 Paper Feed Problem',
    dateOfOccurrence: '2023-11-05',
    timeOfOccurrence: '10:30',
    printerMake: 'Epson',
    printerModel: 'WorkForce Pro WF-3720',
    printerSerialNumber: 'XYZ789012',
    printerIssueDescription: 'Paper feed is erratic, causing multiple jams.',
    urgency: 'high',
    additionalInformation:
      'Issue started after a power outage, need urgent assistance.',
    requestStatus: 'pending',
  },
  {
    title: 'Dell Color Laser Printer Printing Blank Pages',
    dateOfOccurrence: '2023-11-08',
    timeOfOccurrence: '14:15',
    printerMake: 'Dell',
    printerModel: 'Color Laser Printer C3760n',
    printerSerialNumber: 'ABC987654',
    printerIssueDescription: 'Printer is producing completely blank pages.',
    urgency: 'high',
    additionalInformation: 'Replaced toner cartridges, but the issue persists.',
    requestStatus: 'pending',
  },
  {
    title: 'Ricoh Multifunction Printer Scanning Issue',
    dateOfOccurrence: '2023-11-12',
    timeOfOccurrence: '09:45',
    printerMake: 'Ricoh',
    printerModel: 'MP C4504ex',
    printerSerialNumber: 'JKL567890',
    printerIssueDescription:
      "Unable to scan documents, scanner isn't responding.",
    urgency: 'medium',
    additionalInformation:
      'Tried rebooting the printer, but the issue remains unresolved.',
    requestStatus: 'pending',
  },
  {
    title: 'Brother Label Printer Not Recognized by Computer',
    dateOfOccurrence: '2023-11-15',
    timeOfOccurrence: '11:20',
    printerMake: 'Brother',
    printerModel: 'QL-800',
    printerSerialNumber: 'DEF456789',
    printerIssueDescription: "Computer doesn't detect the label printer.",
    urgency: 'medium',
    additionalInformation:
      'Tried reinstalling drivers, but the problem persists.',
    requestStatus: 'pending',
  },
  {
    title: 'Konica Minolta Printer Fuser Error',
    dateOfOccurrence: '2023-11-18',
    timeOfOccurrence: '16:55',
    printerMake: 'Konica Minolta',
    printerModel: 'bizhub 654e',
    printerSerialNumber: 'MNO234567',
    printerIssueDescription:
      'Fuser error message displayed on the printer screen.',
    urgency: 'high',
    additionalInformation:
      "Checked the manual, but couldn't resolve the error.",
    requestStatus: 'pending',
  },
  {
    title: 'Canon PIXMA Wireless Connection Drops',
    dateOfOccurrence: '2023-11-21',
    timeOfOccurrence: '13:10',
    printerMake: 'Canon',
    printerModel: 'PIXMA MG3620',
    printerSerialNumber: 'GHI678901',
    printerIssueDescription:
      'Wireless connection keeps dropping during printing.',
    urgency: 'medium',
    additionalInformation: 'All other devices on the network are stable.',
    requestStatus: 'pending',
  },
  {
    title: 'Xerox Phaser Paper Tray Stuck',
    dateOfOccurrence: '2023-11-24',
    timeOfOccurrence: '08:25',
    printerMake: 'Xerox',
    printerModel: 'Phaser 3260/DI',
    printerSerialNumber: 'PQR345678',
    printerIssueDescription: "Paper tray won't slide out, appears to be stuck.",
    urgency: 'high',
    additionalInformation: 'Need to access paper tray to load more paper.',
    requestStatus: 'pending',
  },
  {
    title: 'Lexmark Printer Slow Printing Speed',
    dateOfOccurrence: '2023-11-27',
    timeOfOccurrence: '12:40',
    printerMake: 'Lexmark',
    printerModel: 'MS810n',
    printerSerialNumber: 'STU456789',
    printerIssueDescription: 'Printing speed has drastically decreased.',
    urgency: 'medium',
    additionalInformation:
      'No recent changes, but printing has become very slow.',
    requestStatus: 'pending',
  },
  {
    title: 'Sharp Multifunction Printer Duplex Printing Issue',
    dateOfOccurrence: '2023-11-30',
    timeOfOccurrence: '14:05',
    printerMake: 'Sharp',
    printerModel: 'MX-4140N',
    printerSerialNumber: 'VWX234567',
    printerIssueDescription:
      "Unable to print in duplex mode, it's not working.",
    urgency: 'medium',
    additionalInformation: 'Need to print double-sided documents urgently.',
    requestStatus: 'pending',
  },
  {
    title: 'Toshiba TEC Printer Ghosting Issue',
    dateOfOccurrence: '2023-12-03',
    timeOfOccurrence: '09:15',
    printerMake: 'Toshiba TEC',
    printerModel: 'B-EX4T3-HS',
    printerSerialNumber: 'HIJ345678',
    printerIssueDescription:
      'Ghosting appears on printed pages, affecting quality.',
    urgency: 'medium',
    additionalInformation:
      'Tried different paper types, but ghosting persists.',
    requestStatus: 'pending',
  },
  {
    title: 'OKI Monochrome Printer Toner Smudging',
    dateOfOccurrence: '2023-12-06',
    timeOfOccurrence: '15:30',
    printerMake: 'OKI',
    printerModel: 'B432dn',
    printerSerialNumber: 'KLM678901',
    printerIssueDescription:
      'Toner smudges on printed pages, making them unreadable.',
    urgency: 'high',
    additionalInformation:
      'Recently replaced toner cartridge, but issue persists.',
    requestStatus: 'pending',
  },
  {
    title: 'Panasonic Laser Printer Noisy Printing',
    dateOfOccurrence: '2023-12-09',
    timeOfOccurrence: '10:50',
    printerMake: 'Panasonic',
    printerModel: 'KX-MB2170',
    printerSerialNumber: 'NOP345678',
    printerIssueDescription: 'Printer makes loud noises during printing.',
    urgency: 'medium',
    additionalInformation:
      'Noise started suddenly, affecting office environment.',
    requestStatus: 'pending',
  },
  {
    title: 'Fujitsu Scanner Duplex Scanning Malfunction',
    dateOfOccurrence: '2023-12-12',
    timeOfOccurrence: '08:05',
    printerMake: 'Fujitsu',
    printerModel: 'fi-7180',
    printerSerialNumber: 'QRS456789',
    printerIssueDescription:
      'Duplex scanning is malfunctioning, scans only one side.',
    urgency: 'high',
    additionalInformation:
      'Important double-sided documents need to be scanned.',
    requestStatus: 'pending',
  },
  {
    title: 'Zebra Technologies Label Printer Ribbon Error',
    dateOfOccurrence: '2023-12-15',
    timeOfOccurrence: '13:40',
    printerMake: 'Zebra Technologies',
    printerModel: 'GX430t',
    printerSerialNumber: 'STU567890',
    printerIssueDescription: 'Ribbon error displayed, unable to print labels.',
    urgency: 'high',
    additionalInformation: 'Ribbon is correctly installed, but error persists.',
    requestStatus: 'pending',
  },
  {
    title: 'Canon PIXMA Pro-1000 Printing Error',
    dateOfOccurrence: '2023-11-02',
    timeOfOccurrence: '14:30',
    printerMake: 'Canon',
    printerModel: 'PIXMA Pro-1000',
    printerSerialNumber: 'CAN123456',
    printerIssueDescription:
      "Printer displays 'Ink Cartridge Error,' need assistance.",
    urgency: 'high',
    additionalInformation: 'Replaced ink cartridges, but error persists.',
    requestStatus: 'pending',
  },
  {
    title: 'Xerox WorkCentre Paper Jam',
    dateOfOccurrence: '2023-11-05',
    timeOfOccurrence: '09:15',
    printerMake: 'Xerox',
    printerModel: 'WorkCentre 6515/DN',
    printerSerialNumber: 'XRX789012',
    printerIssueDescription: 'Paper jam in the rear tray, cannot access it.',
    urgency: 'high',
    additionalInformation:
      'Need help to clear the jam without damaging the printer.',
    requestStatus: 'pending',
  },
  {
    title: 'Epson EcoTank ET-3760 Color Fading',
    dateOfOccurrence: '2023-11-08',
    timeOfOccurrence: '16:20',
    printerMake: 'Epson',
    printerModel: 'EcoTank ET-3760',
    printerSerialNumber: 'EPS456789',
    printerIssueDescription: 'Colors in prints are fading, need a solution.',
    urgency: 'medium',
    additionalInformation: "Prints were vibrant before, now they're dull.",
    requestStatus: 'pending',
  },
  {
    title: 'Brother HL-L2370DW Wi-Fi Connection Issue',
    dateOfOccurrence: '2023-11-11',
    timeOfOccurrence: '11:45',
    printerMake: 'Brother',
    printerModel: 'HL-L2370DW',
    printerSerialNumber: 'BRO123456',
    printerIssueDescription:
      'Wi-Fi connection is unstable, frequently disconnects.',
    urgency: 'medium',
    additionalInformation: 'No issues with other devices on the same network.',
    requestStatus: 'pending',
  },
  {
    title: 'HP OfficeJet Pro 9015 Printing Blank Pages',
    dateOfOccurrence: '2023-11-14',
    timeOfOccurrence: '13:50',
    printerMake: 'HP',
    printerModel: 'OfficeJet Pro 9015',
    printerSerialNumber: 'HP9015SN',
    printerIssueDescription: 'Printer is producing entirely blank pages.',
    urgency: 'high',
    additionalInformation: 'Replaced ink cartridges, but no improvement.',
    requestStatus: 'pending',
  },
  {
    title: 'Lexmark MS510dn Paper Misfeeding',
    dateOfOccurrence: '2023-11-17',
    timeOfOccurrence: '10:10',
    printerMake: 'Lexmark',
    printerModel: 'MS510dn',
    printerSerialNumber: 'LEXSN5678',
    printerIssueDescription: 'Paper is misfeeding, causing frequent jams.',
    urgency: 'high',
    additionalInformation:
      'Unable to print important documents due to this issue.',
    requestStatus: 'pending',
  },
  {
    title: 'Dell C1760nw Toner Smudging',
    dateOfOccurrence: '2023-11-20',
    timeOfOccurrence: '15:40',
    printerMake: 'Dell',
    printerModel: 'C1760nw',
    printerSerialNumber: 'DELL1760',
    printerIssueDescription:
      'Toner is smudging on prints, making them unreadable.',
    urgency: 'medium',
    additionalInformation: 'Replaced toner cartridge, but smudging continues.',
    requestStatus: 'pending',
  },
  {
    title: 'Konica Minolta bizhub C227 Scanner Malfunction',
    dateOfOccurrence: '2023-11-23',
    timeOfOccurrence: '08:55',
    printerMake: 'Konica Minolta',
    printerModel: 'bizhub C227',
    printerSerialNumber: 'KMBHUB227',
    printerIssueDescription:
      'Scanner is not working, unable to scan documents.',
    urgency: 'high',
    additionalInformation: 'Scanner was functioning properly until recently.',
    requestStatus: 'pending',
  },
  {
    title: 'Toshiba TEC B-SA4TP Printing Garbled Text',
    dateOfOccurrence: '2023-11-26',
    timeOfOccurrence: '12:25',
    printerMake: 'Toshiba TEC',
    printerModel: 'B-SA4TP',
    printerSerialNumber: 'TOSHSA4',
    printerIssueDescription: 'Printed text is garbled, not legible.',
    urgency: 'medium',
    additionalInformation: 'No recent changes to printing settings.',
    requestStatus: 'pending',
  },
  {
    title: 'OKI Microline 320 Turbo Printing Dots',
    dateOfOccurrence: '2023-11-29',
    timeOfOccurrence: '09:05',
    printerMake: 'OKI',
    printerModel: 'Microline 320 Turbo',
    printerSerialNumber: 'OKIML320',
    printerIssueDescription: 'Prints have unwanted dots and smudges.',
    urgency: 'medium',
    additionalInformation: 'Cleaned the print head, but issue persists.',
    requestStatus: 'pending',
  },
  {
    title: 'Panasonic KX-MB2061 Fax Sending Failure',
    dateOfOccurrence: '2023-12-02',
    timeOfOccurrence: '14:35',
    printerMake: 'Panasonic',
    printerModel: 'KX-MB2061',
    printerSerialNumber: 'PANM2061',
    printerIssueDescription: 'Unable to send faxes, getting error messages.',
    urgency: 'high',
    additionalInformation:
      'Faxing is critical for our business, need prompt resolution.',
    requestStatus: 'pending',
  },
  {
    title: 'Fujitsu fi-7160 Feeder Jamming',
    dateOfOccurrence: '2023-12-05',
    timeOfOccurrence: '11:15',
    printerMake: 'Fujitsu',
    printerModel: 'fi-7160',
    printerSerialNumber: 'FUJIF7160',
    printerIssueDescription: 'Scanner feeder keeps jamming, unable to scan.',
    urgency: 'high',
    additionalInformation:
      'Important documents are stuck, need immediate assistance.',
    requestStatus: 'pending',
  },
  {
    title: 'Zebra GX430t Label Misalignment',
    dateOfOccurrence: '2023-12-08',
    timeOfOccurrence: '15:20',
    printerMake: 'Zebra Technologies',
    printerModel: 'GX430t',
    printerSerialNumber: 'ZEBRAGX430',
    printerIssueDescription:
      'Labels are printing with misaligned text and barcodes.',
    urgency: 'high',
    additionalInformation: 'Affecting product labeling, need urgent fix.',
    requestStatus: 'pending',
  },
  {
    title: 'HP LaserJet Pro MFP M281fdw Paper Jam',
    dateOfOccurrence: '2023-10-02',
    timeOfOccurrence: '09:30',
    printerMake: 'HP',
    printerModel: 'LaserJet Pro MFP M281fdw',
    printerSerialNumber: 'HPLJ12345',
    printerIssueDescription:
      "Paper is stuck in the printer, can't continue printing.",
    urgency: 'high',
    additionalInformation:
      'Tried removing jammed paper, but the issue persists.',
    requestStatus: 'pending',
  },
  {
    title: 'Canon PIXMA MX492 Scanner Not Responding',
    dateOfOccurrence: '2023-10-05',
    timeOfOccurrence: '11:15',
    printerMake: 'Canon',
    printerModel: 'PIXMA MX492',
    printerSerialNumber: 'CANMX492',
    printerIssueDescription:
      "Scanner doesn't respond when trying to scan documents.",
    urgency: 'medium',
    additionalInformation: 'Scanner was working fine until a few days ago.',
    requestStatus: 'pending',
  },
  {
    title: 'Epson Expression Photo XP-8600 Color Issues',
    dateOfOccurrence: '2023-10-08',
    timeOfOccurrence: '14:40',
    printerMake: 'Epson',
    printerModel: 'Expression Photo XP-8600',
    printerSerialNumber: 'EPXP8600',
    printerIssueDescription: 'Colors in prints are distorted, need assistance.',
    urgency: 'medium',
    additionalInformation: 'Prints were vibrant before, now they look strange.',
    requestStatus: 'pending',
  },
  {
    title: 'Brother HL-L6200DW Wi-Fi Connection Problem',
    dateOfOccurrence: '2023-10-11',
    timeOfOccurrence: '16:25',
    printerMake: 'Brother',
    printerModel: 'HL-L6200DW',
    printerSerialNumber: 'BROHL6200',
    printerIssueDescription: 'Wi-Fi connection keeps dropping during printing.',
    urgency: 'medium',
    additionalInformation: 'No issues with other devices on the same network.',
    requestStatus: 'pending',
  },
  {
    title: 'Xerox Phaser 6510 Jammed Tray 2',
    dateOfOccurrence: '2023-10-14',
    timeOfOccurrence: '09:50',
    printerMake: 'Xerox',
    printerModel: 'Phaser 6510',
    printerSerialNumber: 'XRXPH6510',
    printerIssueDescription: "Paper is jammed in tray 2, can't access it.",
    urgency: 'high',
    additionalInformation: "Need to use tray 2, but it's stuck.",
    requestStatus: 'pending',
  },
  {
    title: 'Ricoh Aficio MP C4501 Printing Smudged Pages',
    dateOfOccurrence: '2023-10-17',
    timeOfOccurrence: '11:30',
    printerMake: 'Ricoh',
    printerModel: 'Aficio MP C4501',
    printerSerialNumber: 'RICMP4501',
    printerIssueDescription:
      'Prints have smudges and streaks, affecting quality.',
    urgency: 'high',
    additionalInformation:
      'Tried cleaning the printer, but smudging continues.',
    requestStatus: 'pending',
  },
  {
    title: 'Lexmark CS310dn Color Alignment Issue',
    dateOfOccurrence: '2023-10-20',
    timeOfOccurrence: '15:20',
    printerMake: 'Lexmark',
    printerModel: 'CS310dn',
    printerSerialNumber: 'LEXCS310',
    printerIssueDescription: 'Colors in prints are misaligned, need a fix.',
    urgency: 'medium',
    additionalInformation: 'Prints were aligned correctly before this issue.',
    requestStatus: 'pending',
  },
  {
    title: 'Dell Color Laser Printer C1760nw Toner Error',
    dateOfOccurrence: '2023-10-23',
    timeOfOccurrence: '14:10',
    printerMake: 'Dell',
    printerModel: 'Color Laser Printer C1760nw',
    printerSerialNumber: 'DELLC1760',
    printerIssueDescription:
      "Printer displays 'Toner Cartridge Error,' need assistance.",
    urgency: 'high',
    additionalInformation: 'Replaced toner cartridges, but error persists.',
    requestStatus: 'pending',
  },
  {
    title: 'Kyocera ECOSYS M2635dn Scanner Malfunction',
    dateOfOccurrence: '2023-10-26',
    timeOfOccurrence: '10:45',
    printerMake: 'Kyocera',
    printerModel: 'ECOSYS M2635dn',
    printerSerialNumber: 'KYCECO2635',
    printerIssueDescription:
      'Scanner is not working, unable to scan documents.',
    urgency: 'high',
    additionalInformation: 'Scanner was functioning properly until recently.',
    requestStatus: 'pending',
  },
  {
    title: 'Sharp MX-2600N Printing Garbled Text',
    dateOfOccurrence: '2023-10-29',
    timeOfOccurrence: '13:15',
    printerMake: 'Sharp',
    printerModel: 'MX-2600N',
    printerSerialNumber: 'SHARP2600',
    printerIssueDescription: 'Printed text is garbled and unreadable.',
    urgency: 'medium',
    additionalInformation: 'No recent changes to printing settings.',
    requestStatus: 'pending',
  },
  {
    title: 'Konica Minolta bizhub 308e Duplex Scanning Issue',
    dateOfOccurrence: '2023-11-01',
    timeOfOccurrence: '16:40',
    printerMake: 'Konica Minolta',
    printerModel: 'bizhub 308e',
    printerSerialNumber: 'KMBHUB308',
    printerIssueDescription:
      "Unable to scan documents in duplex mode, it's not working.",
    urgency: 'medium',
    additionalInformation: 'Need to scan double-sided documents urgently.',
    requestStatus: 'pending',
  },
  {
    title: 'Toshiba TEC B-EX4T1-HS Printing Smudged Barcode Labels',
    dateOfOccurrence: '2023-11-04',
    timeOfOccurrence: '15:55',
    printerMake: 'Toshiba TEC',
    printerModel: 'B-EX4T1-HS',
    printerSerialNumber: 'TOSHTEC4T1',
    printerIssueDescription: 'Barcode labels are smudged and unreadable.',
    urgency: 'high',
    additionalInformation:
      'Labels are critical for inventory, need urgent fix.',
    requestStatus: 'pending',
  },
  {
    title: 'OKI C332dn Printer Fuser Error',
    dateOfOccurrence: '2023-11-07',
    timeOfOccurrence: '12:20',
    printerMake: 'OKI',
    printerModel: 'C332dn',
    printerSerialNumber: 'OKIC332DN',
    printerIssueDescription:
      "Printer displays 'Fuser Error,' can't print anything.",
    urgency: 'high',
    additionalInformation: 'Restarted the printer, but error persists.',
    requestStatus: 'pending',
  },
  {
    title: 'Panasonic KX-MB1500HX Fax Transmission Failure',
    dateOfOccurrence: '2023-11-10',
    timeOfOccurrence: '10:05',
    printerMake: 'Panasonic',
    printerModel: 'KX-MB1500HX',
    printerSerialNumber: 'PANKX1500',
    printerIssueDescription: 'Fax transmissions fail with error messages.',
    urgency: 'high',
    additionalInformation:
      'Faxing is critical for business communications, need a quick resolution.',
    requestStatus: 'pending',
  },
  {
    title: 'Fujitsu fi-7240 Scanner Feeder Misfeeding',
    dateOfOccurrence: '2023-11-13',
    timeOfOccurrence: '14:15',
    printerMake: 'Fujitsu',
    printerModel: 'fi-7240',
    printerSerialNumber: 'FUJIF7240',
    printerIssueDescription:
      'Scanner feeder keeps misfeeding, unable to scan documents.',
    urgency: 'high',
    additionalInformation:
      'Important documents are stuck, need immediate assistance.',
    requestStatus: 'pending',
  },
  {
    title: 'Zebra GX430t Label Printing Alignment Issue',
    dateOfOccurrence: '2023-11-16',
    timeOfOccurrence: '15:30',
    printerMake: 'Zebra Technologies',
    printerModel: 'GX430t',
    printerSerialNumber: 'ZEBRAGX430',
    printerIssueDescription:
      'Labels are printing with misaligned text and barcodes.',
    urgency: 'high',
    additionalInformation: 'Affecting product labeling, need an urgent fix.',
    requestStatus: 'pending',
  },
];

function returnPrinterIssuesRequestBodies({
  printerIssuesArray,
  userDocs,
}: {
  userDocs: DirectoryUserDocument[];
  printerIssuesArray: PrinterIssuesArray;
}) {
  return userDocs.flatMap((userDoc) => {
    const { _id, username, contactNumber, email } = userDoc;

    // random amount of printer issues
    const randomAmountOfPrinterIssues = Math.floor(Math.random() * 3);

    // shuffle array of printer issues
    const shuffledPrinterIssuesArray = shuffleArray(printerIssuesArray);

    // random printer issues
    const randomPrinterIssues = shuffledPrinterIssuesArray.slice(
      0,
      randomAmountOfPrinterIssues
    );

    const bodiesArr = randomPrinterIssues.map((printerIssue) => {
      const body = {
        ...printerIssue,
        userId: _id,
        username,
        contactNumber,
        contactEmail: email,
      };

      return body;
    });

    return bodiesArr;
  });
}

export { printerIssuesArray, returnPrinterIssuesRequestBodies };
