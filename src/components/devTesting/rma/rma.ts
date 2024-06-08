// import { v4 as uuidv4 } from "uuid";

// import { Currency } from "../../../types";
// import { ProductCategory } from "../../dashboard/types";
// import { PURCHASE_DOCUMENTS } from "../purchase/purchaseDocuments";

// type RMAStatus = "Pending" | "Received" | "Cancelled";

// type RMASchema = {
//   purchaseDocumentId: string;
//   customerId: string;
//   productId: string;
//   productSku: string;
//   purchasePrice: number;
//   purchaseCurrency: Currency;
//   productCategory: ProductCategory;
//   rmaCode: string;
//   rmaDate: string;
//   rmaAmount: number;
//   rmaCurrency: Currency;
//   rmaReason: string;
//   rmaStatus: RMAStatus;
// };

// type RMADocument = RMASchema & {
//   _id: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// };

// const RMA_REASONS_POOL = [
//   "Defective product: The electronic item received is not functioning correctly, exhibiting issues such as hardware failures, software glitches, or operational errors.",
//   "Received wrong item: The product delivered does not align with the ordered electronic item, resulting in discrepancies in specifications, features, or model.",
//   "Product damaged during shipping: The electronic device sustained physical damage in transit, compromising its structural integrity, aesthetics, or functionality.",
//   "Product not as described: The received product significantly deviates from the detailed description provided at the time of purchase, including misrepresented specifications or features.",
//   "Compatibility issues: The electronic item is incompatible with specified devices, platforms, or systems, as indicated in the product details, leading to integration challenges.",
//   "Changed my mind: The return request is initiated due to a change in customer preference, decision, or requirements. The product remains unused and in its original, unaltered condition.",
//   "Product malfunction: The electronic device experiences unexpected malfunctions, errors, or irregular behavior affecting its intended purpose, reliability, or user experience.",
//   "Missing accessories or parts: The received product is incomplete, lacking essential accessories, components, or peripherals outlined in the product listing or packaging.",
//   "Product doesn't meet expectations: The electronic item falls short of customer expectations concerning performance, quality, durability, or features, based on pre-purchase anticipation.",
//   "Ordered the wrong item: The customer mistakenly ordered an electronic product that does not align with their intended use, technical requirements, or desired specifications.",
//   "Quality concerns: The electronic device exhibits issues related to build quality, craftsmanship, or material durability, impacting its overall reliability and longevity.",
//   "Software compatibility problems: The electronic item encounters difficulties in integrating with specific software applications, operating systems, or firmware versions.",
//   "Display issues: The electronic device displays problems such as dead pixels, screen artifacts, color inaccuracies, or other visual abnormalities affecting the user viewing experience.",
//   "Power supply problems: The electronic product experiences challenges related to power supply, including issues with adapters, battery performance, or charging functionality.",
//   "Noise or vibration problems: The electronic item generates excessive noise, vibrations, or unusual sounds during operation, causing disturbances or indicating potential mechanical issues.",
//   "Connectivity issues: The electronic device faces problems establishing and maintaining connections, whether through wired interfaces (USB, HDMI) or wireless protocols (Wi-Fi, Bluetooth).",
//   "User interface concerns: The electronic item exhibits difficulties in user interaction, including unresponsive buttons, touch screen malfunctions, or navigation problems.",
//   "Overheating problems: The electronic product displays issues related to excessive heat generation during operation, potentially leading to performance degradation or safety concerns.",
//   "Inconsistent performance: The electronic device demonstrates irregularities in performance, such as intermittent slowdowns, freezes, or unexpected shutdowns, impacting user experience.",
//   "Security vulnerabilities: The electronic item is found to have security vulnerabilities or weaknesses that could compromise the confidentiality, integrity, or availability of user data.",
//   "Software malfunction: The electronic device experiences software-related issues, such as crashes, bugs, or system instability, affecting its overall usability.",
//   "Faulty peripherals: Included peripherals or accessories, such as cables, adapters, or external components, exhibit defects, hindering proper functionality.",
//   "Data loss concerns: The electronic item poses risks of data loss, corruption, or compromised storage integrity, necessitating a return for data security reasons.",
//   "Inadequate user documentation: The product's user documentation or manuals lack clarity, completeness, or accuracy, impeding the user's understanding of features and functionality.",
//   "Build material issues: The electronic device displays concerns related to the quality or suitability of materials used in its construction, impacting its structural integrity or durability.",
//   "Environmental compatibility problems: The product encounters challenges related to its environmental impact, energy efficiency, or compliance with ecological standards.",
//   "Difficulties in setup: The electronic item proves challenging to set up or configure, resulting in frustration for the user and hindering the initial user experience.",
//   "Firmware update issues: Attempts to update the device's firmware result in complications, errors, or failures, affecting the performance or security of the product.",
//   "Inadequate packaging: The product packaging fails to adequately protect the electronic item during shipping, leading to damage or compromise before reaching the customer.",
//   "Lack of customer support: Customers experience unsatisfactory levels of support, whether due to unresponsiveness, unhelpful assistance, or delayed resolution of issues.",
//   "Health and safety concerns: The electronic device poses potential health or safety risks, such as overheating, emitting harmful substances, or unsafe electrical behavior.",
//   "Localization problems: The product does not meet language, regional, or regulatory requirements, causing issues for users in specific geographic locations or language preferences.",
//   "Ergonomic design flaws: The electronic item exhibits design flaws impacting user comfort, usability, or accessibility, leading to discomfort or inconvenience during use.",
//   "Limited product lifespan: Customers notice a shorter-than-expected lifespan for the electronic device, with premature wear and tear or frequent component failures.",
//   "Insufficient product support: The product lacks adequate support in terms of available accessories, replacement parts, or third-party compatibility, limiting its long-term viability.",
//   "Non-compliance with industry standards: The electronic device fails to comply with established industry standards, certifications, or regulations, posing legal or functional risks.",
//   "Delayed product availability: Customers experience delays in receiving the product, impacting planned use or causing inconvenience due to postponed delivery timelines.",
//   "Unwanted software bundled: The electronic item includes unwanted or intrusive software applications that negatively impact the user experience or compromise privacy.",
//   "Insufficient security features: The product lacks essential security features, leaving users vulnerable to potential cybersecurity threats or unauthorized access.",
//   "Unreliable wireless connectivity: The electronic device exhibits issues related to unreliable wireless connections, affecting Wi-Fi, Bluetooth, or other connectivity options.",
//   "Persistent connectivity issues: The electronic device consistently struggles to establish and maintain reliable connections, impacting its functionality and user experience.",
//   "Undisclosed product limitations: Critical limitations or restrictions not communicated in the product documentation or marketing materials affect the product's suitability for the user's needs.",
//   "Software update failures: Attempts to update the device's software result in repeated failures, preventing the installation of crucial updates and patches.",
//   "Limited technical support resources: Inadequate availability of technical support resources, such as knowledge base articles or forums, hinders users seeking assistance.",
//   "Unintended behavior post-update: The electronic item exhibits unexpected behavior or malfunctions after applying software or firmware updates, disrupting normal operation.",
//   "Unaddressed product recalls: The product is part of a recall due to safety concerns or manufacturing defects, necessitating its return for replacement or repair.",
//   "Environmental impact concerns: Users have reservations about the environmental impact of the product, such as excessive energy consumption or non-recyclable materials.",
//   "Non-compatibility with industry standards: The electronic device fails to meet established industry standards, leading to interoperability issues with other devices or systems.",
//   "Cumbersome user interface design: Poorly designed user interfaces result in a non-intuitive and cumbersome user experience, causing frustration and usability challenges.",
//   "Flawed warranty or return process: Customers encounter complications or delays in navigating the warranty or return process, hindering the swift resolution of issues.",
//   "Unresolved product recalls: Despite being part of a recall, customers find that the recall-related issues persist even after returning the product for inspection or replacement.",
//   "Inadequate power management: The electronic item exhibits deficiencies in power management, leading to inefficient energy consumption or premature battery degradation.",
//   "Unreliable firmware stability: The device's firmware lacks stability, resulting in frequent crashes, freezes, or reboots that impact its overall reliability.",
//   "Incompatibility with third-party accessories: The product faces compatibility issues with commonly used third-party accessories, limiting its versatility and convenience for users.",
//   "Unaddressed safety vulnerabilities: Users discover undisclosed safety vulnerabilities that pose risks to user safety or compromise the integrity of the electronic device.",
//   "Limited accessibility features: The product lacks essential accessibility features, such as screen readers or voice commands, restricting usability for individuals with disabilities.",
//   "Ineffective heat dissipation: The electronic item struggles to dissipate heat effectively during operation, potentially leading to overheating and performance degradation.",
//   "Data privacy concerns: Users identify concerns related to data privacy and security, such as unauthorized data collection or insufficient encryption measures.",
//   "Inconsistent product documentation: Discrepancies or inaccuracies in product documentation lead to confusion regarding proper usage, setup, or troubleshooting.",
//   "Unexpected product obsolescence: The electronic item becomes obsolete sooner than expected, with discontinued support and limited availability of replacement parts.",
//   "Persistent software instability: The electronic device consistently exhibits software-related instabilities, leading to frequent crashes, errors, or unresponsiveness.",
//   "Undisclosed hardware limitations: Critical limitations in the hardware not adequately communicated result in suboptimal performance or unexpected issues.",
//   "Inadequate packaging protection: The product packaging fails to provide sufficient protection during transit, resulting in physical damage or cosmetic defects upon arrival.",
//   "Incomplete feature set: The electronic item lacks certain features or functionalities promised in the product description, impacting its overall value and usefulness.",
//   "Overly complex user configuration: Users face challenges in configuring and customizing the device due to unnecessarily complex or convoluted settings.",
//   "Non-compliance with data protection laws: The product does not align with data protection regulations, potentially exposing users to privacy risks or legal consequences.",
//   "Poor audiovisual quality: The electronic device displays issues related to audiovisual quality, including distorted sound, pixelation, or color inaccuracies during operation.",
//   "Unaddressed security vulnerabilities: The product contains unresolved security vulnerabilities that could compromise user data or expose it to unauthorized access.",
//   "Unstable wireless connectivity: The electronic device experiences instability in wireless connections, leading to frequent drops, slow speeds, or unreliable network performance.",
//   "Inadequate warranty coverage: Users discover limitations in warranty coverage, leaving certain issues or components unprotected and requiring additional expenses for repair.",
//   "Ineffective customer support: Users encounter difficulties in receiving timely and effective assistance from customer support, hindering issue resolution.",
//   "Insufficient durability: The electronic item exhibits signs of premature wear and tear, reduced structural integrity, or a shorter-than-expected lifespan.",
//   "Failure to meet industry certifications: The product lacks essential certifications or compliance with industry standards, impacting its acceptance in specific markets or use cases.",
//   "Incompatibility with common software: The electronic device faces compatibility issues with widely used software applications, limiting its practical usability for users.",
//   "Misleading marketing claims: Discrepancies between marketing claims and actual product performance lead to dissatisfaction and a desire for product return.",
//   "Non-adherence to ergonomic principles: The product design lacks adherence to ergonomic principles, resulting in discomfort, strain, or inconvenience during prolonged use.",
//   "Inadequate power efficiency: The electronic item demonstrates poor energy efficiency, resulting in excessive power consumption and contributing to higher operational costs.",
//   "Incomplete user education: Users encounter difficulties in understanding or maximizing the use of the product due to insufficient educational resources or documentation.",
//   "Unreliable firmware updates: Attempts to update the device's firmware result in reliability issues, negatively impacting overall performance or introducing new problems.",
//   "Unresolved customer complaints: Users find that previously raised complaints or concerns have not been adequately addressed, necessitating further action.",
//   "Persistent power supply issues: The electronic device consistently encounters problems related to power supply, including frequent outages, surges, or inconsistent voltage.",
//   "Undisclosed environmental limitations: The product fails to perform optimally under specific environmental conditions, impacting its reliability or lifespan.",
//   "Insufficient protection against physical damage: The product design lacks adequate protection features, resulting in susceptibility to physical impacts, scratches, or breakage.",
//   "Mismatched product configuration: The electronic item is delivered with configurations that do not align with the user's specified preferences or requirements.",
//   "Non-compliance with accessibility standards: The product falls short of meeting accessibility standards, hindering usability for individuals with disabilities.",
//   "Unresolved design flaws: Users identify design flaws that impact the overall functionality, aesthetics, or safety of the electronic device.",
//   "Unexpected chemical emissions: The product emits unexpected or undisclosed chemicals during operation, posing health risks or environmental concerns.",
//   "Unresponsive touch or input controls: The electronic device exhibits unresponsiveness or inaccuracies in touchscreens, buttons, or other input controls.",
//   "Delayed firmware updates: The device experiences delays in receiving crucial firmware updates, leaving it vulnerable to security threats or missing out on enhanced features.",
//   "Lack of community support: Users find limited or no community-driven support resources, forums, or user groups, hindering collaborative issue resolution.",
//   "Unaddressed overheating concerns: The electronic item demonstrates overheating issues during regular operation, posing risks to both user safety and product longevity.",
//   "Limited user customization options: Users encounter restrictions in customizing the device to suit their preferences, limiting personalization and adaptability.",
//   "Failure to meet energy efficiency standards: The product falls short of established energy efficiency standards, leading to higher energy consumption than indicated.",
//   "Incompatibility with emerging technologies: The electronic device struggles to integrate seamlessly with emerging technologies, limiting its future-proofing and adaptability.",
//   "Inadequate protection against cybersecurity threats: The product lacks sufficient security features, leaving users vulnerable to cyber attacks, data breaches, or unauthorized access.",
//   "Persistent noise or interference issues: The electronic item consistently generates unwanted noise, interference, or disruptions, affecting both audio and visual components.",
//   "Limited scalability options: The product lacks scalability, hindering users from expanding or upgrading the device to accommodate changing needs or technological advancements.",
//   "Unresolved user interface complaints: Users experience persistent difficulties with the product's user interface, including unresponsive elements, confusing layouts, or counterintuitive controls.",
//   "Unanticipated privacy concerns: The product raises unexpected privacy concerns related to data collection, sharing, or usage, impacting user trust and satisfaction.",
//   "Ineffective cooling system: The electronic device demonstrates inefficiencies in its cooling system, resulting in inadequate heat dissipation and potential damage to internal components.",
// ];

// function returnRMASchemas({
//   rmaReasonsPool,
//   purchaseDocuments,
// }: {
//   rmaReasonsPool: typeof RMA_REASONS_POOL;
//   purchaseDocuments: typeof PURCHASE_DOCUMENTS;
// }) {
//   const rmaStatusData = ["Pending", "Received", "Cancelled"] as const;

//   return purchaseDocuments.reduce<RMASchema[]>((rmaSchemasAcc, purchaseDocument) => {
//     purchaseDocument.products.forEach((product) => {
//       if (product.orderStatus === "Returned") {
//         const randomRMAReason =
//           rmaReasonsPool[Math.floor(Math.random() * rmaReasonsPool.length)];

//         const randomRMAStatus =
//           rmaStatusData[Math.floor(Math.random() * rmaStatusData.length)];

//         const purchaseDate = new Date(purchaseDocument.dateOfPurchase);

//         const rmaSchema: RMASchema = {
//           purchaseDocumentId: purchaseDocument._id,
//           customerId: purchaseDocument.customerId,
//           productId: product.productId,
//           productSku: product.sku,
//           purchasePrice: product.price,
//           purchaseCurrency: product.currency as Currency,
//           productCategory: product.productCategory as ProductCategory,
//           rmaCode: uuidv4(),
//           // date after purchase date but before today
//           rmaDate: new Date(
//             purchaseDate.getTime() +
//               Math.random() * (new Date().getTime() - purchaseDate.getTime())
//           ).toISOString(),
//           rmaAmount: purchaseDocument.purchaseAmount,
//           rmaCurrency: purchaseDocument.purchaseCurrency as Currency,
//           rmaReason: randomRMAReason,
//           rmaStatus: randomRMAStatus,
//         };

//         rmaSchemasAcc.push(rmaSchema);
//       }
//     });

//     return rmaSchemasAcc;
//   }, []);
// }

// export { returnRMASchemas, RMA_REASONS_POOL };
// export type { RMADocument, RMASchema, RMAStatus };

export {};
