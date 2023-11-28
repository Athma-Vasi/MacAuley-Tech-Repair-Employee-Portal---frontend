// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
//  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
//     CREATE PRODUCT ACTIONS OBJECT
//  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
// Dispatch function (from useReducer hook) in input event handlers
// passes an action type with a payload to the component reducer function
// which retrieves the corresponding reducer from the component reducer map
// and updates the component state with the payload.
// Encapsulating an action string inside an action object instead of string literals allows for :
// - type checking and IDE auto-complete
// - prevents collision with other action strings
// - code consistency, maintainability, readability and accuracy
// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

import { CreateProductAction } from "./types";

const createProductAction: CreateProductAction = {
	// ╔═════════════════════════════════════════════════════════════════╗
	//    PAGE 1
	// ╚═════════════════════════════════════════════════════════════════╝

	// brand
	setBrand: "setBrand",
	setIsBrandValid: "setIsBrandValid",
	setIsBrandFocused: "setIsBrandFocused",
	// model
	setModel: "setModel",
	setIsModelValid: "setIsModelValid",
	setIsModelFocused: "setIsModelFocused",
	// description
	setDescription: "setDescription",
	setIsDescriptionValid: "setIsDescriptionValid",
	setIsDescriptionFocused: "setIsDescriptionFocused",
	// price
	setPrice: "setPrice",
	setIsPriceValid: "setIsPriceValid",
	setIsPriceFocused: "setIsPriceFocused",
	// currency
	setCurrency: "setCurrency",
	// availability
	setAvailability: "setAvailability",
	// quantity
	setQuantity: "setQuantity",
	setIsQuantityValid: "setIsQuantityValid",
	setIsQuantityFocused: "setIsQuantityFocused",
	// weight
	setWeight: "setWeight",
	setIsWeightValid: "setIsWeightValid",
	setIsWeightFocused: "setIsWeightFocused",
	// weight unit
	setWeightUnit: "setWeightUnit",
	// dimension length
	setDimensionLength: "setDimensionLength",
	setIsDimensionLengthValid: "setIsDimensionLengthValid",
	setIsDimensionLengthFocused: "setIsDimensionLengthFocused",
	// dimension length unit
	setDimensionLengthUnit: "setDimensionLengthUnit",
	// dimension width
	setDimensionWidth: "setDimensionWidth",
	setIsDimensionWidthValid: "setIsDimensionWidthValid",
	setIsDimensionWidthFocused: "setIsDimensionWidthFocused",
	// dimension width unit
	setDimensionWidthUnit: "setDimensionWidthUnit",
	// dimension height
	setDimensionHeight: "setDimensionHeight",
	setIsDimensionHeightValid: "setIsDimensionHeightValid",
	setIsDimensionHeightFocused: "setIsDimensionHeightFocused",
	// dimension height unit
	setDimensionHeightUnit: "setDimensionHeightUnit",
	// additional comments
	setAdditionalComments: "setAdditionalComments",
	setIsAdditionalCommentsValid: "setIsAdditionalCommentsValid",
	setIsAdditionalCommentsFocused: "setIsAdditionalCommentsFocused",

	// ╔═════════════════════════════════════════════════════════════════╗
	//    PAGE 2
	// ╚═════════════════════════════════════════════════════════════════╝

	// product category
	setProductCategory: "setProductCategory",

	// ╭─────────────────────────────────────────────────────────────────╮
	//    ACCESSORY
	// ╰─────────────────────────────────────────────────────────────────╯
	setAccessoryType: "setAccessoryType",
	setIsAccessoryTypeValid: "setIsAccessoryTypeValid",
	setIsAccessoryTypeFocused: "setIsAccessoryTypeFocused",
	setAccessoryColor: "setAccessoryColor",
	setIsAccessoryColorValid: "setIsAccessoryColorValid",
	setIsAccessoryColorFocused: "setIsAccessoryColorFocused",
	setAccessoryInterface: "setAccessoryInterface",
	setAccessoryFieldsAdditionalMap: "setAccessoryFieldsAdditionalMap",
	setAreAccessoryFieldsAdditionalMapFocused:
		"setAreAccessoryFieldsAdditionalMapFocused",
	setAreAccessoryFieldsAdditionalMapValid:
		"setAreAccessoryFieldsAdditionalMapValid",
	setCurrentlySelectedAdditionalFieldIndex:
		"setCurrentlySelectedAdditionalFieldIndex",

	// ╭─────────────────────────────────────────────────────────────────╮
	//    CENTRAL PROCESSING UNIT (CPU)
	// ╰─────────────────────────────────────────────────────────────────╯
	setCpuSocket: "setCpuSocket",
	setIsCpuSocketValid: "setIsCpuSocketValid",
	setIsCpuSocketFocused: "setIsCpuSocketFocused",
	setCpuFrequency: "setCpuFrequency",
	setIsCpuFrequencyValid: "setIsCpuFrequencyValid",
	setIsCpuFrequencyFocused: "setIsCpuFrequencyFocused",
	setCpuCores: "setCpuCores",
	setIsCpuCoresValid: "setIsCpuCoresValid",
	setIsCpuCoresFocused: "setIsCpuCoresFocused",
	setCpuL1CacheCapacity: "setCpuL1CacheCapacity",
	setIsCpuL1CacheCapacityValid: "setIsCpuL1CacheCapacityValid",
	setIsCpuL1CacheCapacityFocused: "setIsCpuL1CacheCapacityFocused",
	setCpuL1CacheCapacityUnit: "setCpuL1CacheCapacityUnit",
	setCpuL2CacheCapacity: "setCpuL2CacheCapacity",
	setIsCpuL2CacheCapacityValid: "setIsCpuL2CacheCapacityValid",
	setIsCpuL2CacheCapacityFocused: "setIsCpuL2CacheCapacityFocused",
	setCpuL2CacheCapacityUnit: "setCpuL2CacheCapacityUnit",
	setCpuL3CacheCapacity: "setCpuL3CacheCapacity",
	setIsCpuL3CacheCapacityValid: "setIsCpuL3CacheCapacityValid",
	setIsCpuL3CacheCapacityFocused: "setIsCpuL3CacheCapacityFocused",
	setCpuL3CacheCapacityUnit: "setCpuL3CacheCapacityUnit",
	setCpuWattage: "setCpuWattage",
	setIsCpuWattageValid: "setIsCpuWattageValid",
	setIsCpuWattageFocused: "setIsCpuWattageFocused",
	setCpuFieldsAdditionalMap: "setCpuFieldsAdditionalMap",
	setAreCpuFieldsAdditionalMapFocused: "setAreCpuFieldsAdditionalMapFocused",
	setAreCpuFieldsAdditionalMapValid: "setAreCpuFieldsAdditionalMapValid",

	// ╭─────────────────────────────────────────────────────────────────╮
	//    COMPUTER CASE
	// ╰─────────────────────────────────────────────────────────────────╯
	setCaseColor: "setCaseColor",
	setIsCaseColorValid: "setIsCaseColorValid",
	setIsCaseColorFocused: "setIsCaseColorFocused",
	setCaseType: "setCaseType",
	setCaseSidePanel: "setCaseSidePanel",
	setCaseFieldsAdditionalMap: "setCaseFieldsAdditionalMap",
	setAreCaseFieldsAdditionalMapFocused: "setAreCaseFieldsAdditionalMapFocused",
	setAreCaseFieldsAdditionalMapValid: "setAreCaseFieldsAdditionalMapValid",

	// ╭─────────────────────────────────────────────────────────────────╮
	//    DISPLAY
	// ╰─────────────────────────────────────────────────────────────────╯
	setDisplaySize: "setDisplaySize",
	setIsDisplaySizeValid: "setIsDisplaySizeValid",
	setIsDisplaySizeFocused: "setIsDisplaySizeFocused",
	setDisplayResolutionHorizontal: "setDisplayResolutionHorizontal",
	setIsDisplayResolutionHorizontalValid:
		"setIsDisplayResolutionHorizontalValid",
	setIsDisplayResolutionHorizontalFocused:
		"setIsDisplayResolutionHorizontalFocused",
	setDisplayResolutionVertical: "setDisplayResolutionVertical",
	setIsDisplayResolutionVerticalValid: "setIsDisplayResolutionVerticalValid",
	setIsDisplayResolutionVerticalFocused:
		"setIsDisplayResolutionVerticalFocused",
	setDisplayRefreshRate: "setDisplayRefreshRate",
	setIsDisplayRefreshRateValid: "setIsDisplayRefreshRateValid",
	setIsDisplayRefreshRateFocused: "setIsDisplayRefreshRateFocused",
	setDisplayPanelType: "setDisplayPanelType",
	setDisplayResponseTime: "setDisplayResponseTime",
	setIsDisplayResponseTimeValid: "setIsDisplayResponseTimeValid",
	setIsDisplayResponseTimeFocused: "setIsDisplayResponseTimeFocused",
	setDisplayAspectRatio: "setDisplayAspectRatio",
	setIsDisplayAspectRatioValid: "setIsDisplayAspectRatioValid",
	setIsDisplayAspectRatioFocused: "setIsDisplayAspectRatioFocused",
	setDisplayFieldsAdditionalMap: "setDisplayFieldsAdditionalMap",
	setAreDisplayFieldsAdditionalMapFocused:
		"setAreDisplayFieldsAdditionalMapFocused",
	setAreDisplayFieldsAdditionalMapValid:
		"setAreDisplayFieldsAdditionalMapValid",

	// ╭─────────────────────────────────────────────────────────────────╮
	//    GRAPHICS PROCESSING UNIT (GPU)
	// ╰─────────────────────────────────────────────────────────────────╯
	setGpuChipset: "setGpuChipset",
	setIsGpuChipsetValid: "setIsGpuChipsetValid",
	setIsGpuChipsetFocused: "setIsGpuChipsetFocused",
	setGpuMemoryCapacity: "setGpuMemoryCapacity",
	setIsGpuMemoryCapacityValid: "setIsGpuMemoryCapacityValid",
	setIsGpuMemoryCapacityFocused: "setIsGpuMemoryCapacityFocused",
	setGpuMemoryCapacityUnit: "setGpuMemoryCapacityUnit",
	setGpuCoreClock: "setGpuCoreClock",
	setIsGpuCoreClockValid: "setIsGpuCoreClockValid",
	setIsGpuCoreClockFocused: "setIsGpuCoreClockFocused",
	setGpuBoostClock: "setGpuBoostClock",
	setIsGpuBoostClockValid: "setIsGpuBoostClockValid",
	setIsGpuBoostClockFocused: "setIsGpuBoostClockFocused",
	setGpuTdp: "setGpuTdp",
	setIsGpuTdpValid: "setIsGpuTdpValid",
	setIsGpuTdpFocused: "setIsGpuTdpFocused",
	setGpuFieldsAdditionalMap: "setGpuFieldsAdditionalMap",
	setAreGpuFieldsAdditionalMapFocused: "setAreGpuFieldsAdditionalMapFocused",
	setAreGpuFieldsAdditionalMapValid: "setAreGpuFieldsAdditionalMapValid",

	// ╭─────────────────────────────────────────────────────────────────╮
	//    HEADPHONE
	// ╰─────────────────────────────────────────────────────────────────╯
	setHeadphoneType: "setHeadphoneType",
	setHeadphoneDriver: "setHeadphoneDriver",
	setIsHeadphoneDriverValid: "setIsHeadphoneDriverValid",
	setIsHeadphoneDriverFocused: "setIsHeadphoneDriverFocused",
	setHeadphoneFrequencyResponse: "setHeadphoneFrequencyResponse",
	setIsHeadphoneFrequencyResponseValid: "setIsHeadphoneFrequencyResponseValid",
	setIsHeadphoneFrequencyResponseFocused:
		"setIsHeadphoneFrequencyResponseFocused",
	setHeadphoneImpedance: "setHeadphoneImpedance",
	setIsHeadphoneImpedanceValid: "setIsHeadphoneImpedanceValid",
	setIsHeadphoneImpedanceFocused: "setIsHeadphoneImpedanceFocused",
	setHeadphoneColor: "setHeadphoneColor",
	setIsHeadphoneColorValid: "setIsHeadphoneColorValid",
	setIsHeadphoneColorFocused: "setIsHeadphoneColorFocused",
	setHeadphoneInterface: "setHeadphoneInterface",
	setHeadphoneFieldsAdditionalMap: "setHeadphoneFieldsAdditionalMap",
	setAreHeadphoneFieldsAdditionalMapFocused:
		"setAreHeadphoneFieldsAdditionalMapFocused",
	setAreHeadphoneFieldsAdditionalMapValid:
		"setAreHeadphoneFieldsAdditionalMapValid",

	// ╭─────────────────────────────────────────────────────────────────╮
	//    KEYBOARD
	// ╰─────────────────────────────────────────────────────────────────╯
	setKeyboardSwitch: "setKeyboardSwitch",
	setKeyboardLayout: "setKeyboardLayout",
	setKeyboardBacklight: "setKeyboardBacklight",
	setKeyboardInterface: "setKeyboardInterface",
	setKeyboardFieldsAdditionalMap: "setKeyboardFieldsAdditionalMap",
	setAreKeyboardFieldsAdditionalMapFocused:
		"setAreKeyboardFieldsAdditionalMapFocused",
	setAreKeyboardFieldsAdditionalMapValid:
		"setAreKeyboardFieldsAdditionalMapValid",

	// ╭─────────────────────────────────────────────────────────────────╮
	//    MEMORY (RAM)
	// ╰─────────────────────────────────────────────────────────────────╯
	setRamDataRate: "setRamDataRate",
	setIsRamDataRateValid: "setIsRamDataRateValid",
	setIsRamDataRateFocused: "setIsRamDataRateFocused",
	setRamModulesQuantity: "setRamModulesQuantity",
	setIsRamModulesQuantityValid: "setIsRamModulesQuantityValid",
	setIsRamModulesQuantityFocused: "setIsRamModulesQuantityFocused",
	setRamModulesCapacity: "setRamModulesCapacity",
	setIsRamModulesCapacityValid: "setIsRamModulesCapacityValid",
	setIsRamModulesCapacityFocused: "setIsRamModulesCapacityFocused",
	setRamModulesCapacityUnit: "setRamModulesCapacityUnit",
	setRamType: "setRamType",
	setRamColor: "setRamColor",
	setIsRamColorValid: "setIsRamColorValid",
	setIsRamColorFocused: "setIsRamColorFocused",
	setRamVoltage: "setRamVoltage",
	setIsRamVoltageValid: "setIsRamVoltageValid",
	setIsRamVoltageFocused: "setIsRamVoltageFocused",
	setRamTiming: "setRamTiming",
	setIsRamTimingValid: "setIsRamTimingValid",
	setIsRamTimingFocused: "setIsRamTimingFocused",
	setRamFieldsAdditionalMap: "setRamFieldsAdditionalMap",
	setAreRamFieldsAdditionalMapFocused: "setAreRamFieldsAdditionalMapFocused",
	setAreRamFieldsAdditionalMapValid: "setAreRamFieldsAdditionalMapValid",

	// ╭─────────────────────────────────────────────────────────────────╮
	//    MICROPHONE
	// ╰─────────────────────────────────────────────────────────────────╯
	setMicrophoneType: "setMicrophoneType",
	setMicrophonePolarPattern: "setMicrophonePolarPattern",
	setMicrophoneInterface: "setMicrophoneInterface",
	setMicrophoneColor: "setMicrophoneColor",
	setIsMicrophoneColorValid: "setIsMicrophoneColorValid",
	setIsMicrophoneColorFocused: "setIsMicrophoneColorFocused",
	setMicrophoneFrequencyResponse: "setMicrophoneFrequencyResponse",
	setIsMicrophoneFrequencyResponseValid:
		"setIsMicrophoneFrequencyResponseValid",
	setIsMicrophoneFrequencyResponseFocused:
		"setIsMicrophoneFrequencyResponseFocused",
	setMicrophoneFieldsAdditionalMap: "setMicrophoneFieldsAdditionalMap",
	setAreMicrophoneFieldsAdditionalMapFocused:
		"setAreMicrophoneFieldsAdditionalMapFocused",
	setAreMicrophoneFieldsAdditionalMapValid:
		"setAreMicrophoneFieldsAdditionalMapValid",

	// ╭─────────────────────────────────────────────────────────────────╮
	//    MOTHERBOARD
	// ╰─────────────────────────────────────────────────────────────────╯
	setMotherboardSocket: "setMotherboardSocket",
	setIsMotherboardSocketValid: "setIsMotherboardSocketValid",
	setIsMotherboardSocketFocused: "setIsMotherboardSocketFocused",
	setMotherboardChipset: "setMotherboardChipset",
	setIsMotherboardChipsetValid: "setIsMotherboardChipsetValid",
	setIsMotherboardChipsetFocused: "setIsMotherboardChipsetFocused",
	setMotherboardFormFactor: "setMotherboardFormFactor",
	setMotherboardMemoryMaxCapacity: "setMotherboardMemoryMaxCapacity",
	setIsMotherboardMemoryMaxCapacityValid:
		"setIsMotherboardMemoryMaxCapacityValid",
	setIsMotherboardMemoryMaxCapacityFocused:
		"setIsMotherboardMemoryMaxCapacityFocused",
	setMotherboardMemoryMaxCapacityUnit: "setMotherboardMemoryMaxCapacityUnit",
	setMotherboardMemorySlots: "setMotherboardMemorySlots",
	setIsMotherboardMemorySlotsValid: "setIsMotherboardMemorySlotsValid",
	setIsMotherboardMemorySlotsFocused: "setIsMotherboardMemorySlotsFocused",
	setMotherboardMemoryType: "setMotherboardMemoryType",
	setMotherboardSataPorts: "setMotherboardSataPorts",
	setIsMotherboardSataPortsValid: "setIsMotherboardSataPortsValid",
	setIsMotherboardSataPortsFocused: "setIsMotherboardSataPortsFocused",
	setMotherboardM2Slots: "setMotherboardM2Slots",
	setIsMotherboardM2SlotsValid: "setIsMotherboardM2SlotsValid",
	setIsMotherboardM2SlotsFocused: "setIsMotherboardM2SlotsFocused",
	setMotherboardPcie3Slots: "setMotherboardPcie3Slots",
	setIsMotherboardPcie3SlotsValid: "setIsMotherboardPcie3SlotsValid",
	setIsMotherboardPcie3SlotsFocused: "setIsMotherboardPcie3SlotsFocused",
	setMotherboardPcie4Slots: "setMotherboardPcie4Slots",
	setIsMotherboardPcie4SlotsValid: "setIsMotherboardPcie4SlotsValid",
	setIsMotherboardPcie4SlotsFocused: "setIsMotherboardPcie4SlotsFocused",
	setMotherboardPcie5Slots: "setMotherboardPcie5Slots",
	setIsMotherboardPcie5SlotsValid: "setIsMotherboardPcie5SlotsValid",
	setIsMotherboardPcie5SlotsFocused: "setIsMotherboardPcie5SlotsFocused",
	setMotherboardFieldsAdditionalMap: "setMotherboardFieldsAdditionalMap",
	setAreMotherboardFieldsAdditionalMapFocused:
		"setAreMotherboardFieldsAdditionalMapFocused",
	setAreMotherboardFieldsAdditionalMapValid:
		"setAreMotherboardFieldsAdditionalMapValid",

	// ╭─────────────────────────────────────────────────────────────────╮
	//    MOUSE
	// ╰─────────────────────────────────────────────────────────────────╯
	setMouseSensor: "setMouseSensor",
	setMouseDpi: "setMouseDpi",
	setIsMouseDpiValid: "setIsMouseDpiValid",
	setIsMouseDpiFocused: "setIsMouseDpiFocused",
	setMouseButtons: "setMouseButtons",
	setIsMouseButtonsValid: "setIsMouseButtonsValid",
	setIsMouseButtonsFocused: "setIsMouseButtonsFocused",
	setMouseColor: "setMouseColor",
	setIsMouseColorValid: "setIsMouseColorValid",
	setIsMouseColorFocused: "setIsMouseColorFocused",
	setMouseInterface: "setMouseInterface",
	setMouseFieldsAdditionalMap: "setMouseFieldsAdditionalMap",
	setAreMouseFieldsAdditionalMapFocused:
		"setAreMouseFieldsAdditionalMapFocused",
	setAreMouseFieldsAdditionalMapValid: "setAreMouseFieldsAdditionalMapValid",

	// ╭─────────────────────────────────────────────────────────────────╮
	//    POWER SUPPLY UNIT (PSU)
	// ╰─────────────────────────────────────────────────────────────────╯
	setPsuWattage: "setPsuWattage",
	setIsPsuWattageValid: "setIsPsuWattageValid",
	setIsPsuWattageFocused: "setIsPsuWattageFocused",
	setPsuEfficiency: "setPsuEfficiency",
	setPsuFormFactor: "setPsuFormFactor",
	setPsuModularity: "setPsuModularity",
	setPsuFieldsAdditionalMap: "setPsuFieldsAdditionalMap",
	setArePsuFieldsAdditionalMapFocused: "setArePsuFieldsAdditionalMapFocused",
	setArePsuFieldsAdditionalMapValid: "setArePsuFieldsAdditionalMapValid",

	// ╭─────────────────────────────────────────────────────────────────╮
	//    SMARTPHONE
	// ╰─────────────────────────────────────────────────────────────────╯
	setSmartphoneOs: "setSmartphoneOs",
	setSmartphoneChipset: "setSmartphoneChipset",
	setIsSmartphoneChipsetValid: "setIsSmartphoneChipsetValid",
	setIsSmartphoneChipsetFocused: "setIsSmartphoneChipsetFocused",
	setSmartphoneDisplay: "setSmartphoneDisplay",
	setIsSmartphoneDisplayValid: "setIsSmartphoneDisplayValid",
	setIsSmartphoneDisplayFocused: "setIsSmartphoneDisplayFocused",
	setSmartphoneResolutionHorizontal: "setSmartphoneResolutionHorizontal",
	setIsSmartphoneResolutionHorizontalValid:
		"setIsSmartphoneResolutionHorizontalValid",
	setIsSmartphoneResolutionHorizontalFocused:
		"setIsSmartphoneResolutionHorizontalFocused",
	setSmartphoneResolutionVertical: "setSmartphoneResolutionVertical",
	setIsSmartphoneResolutionVerticalValid:
		"setIsSmartphoneResolutionVerticalValid",
	setIsSmartphoneResolutionVerticalFocused:
		"setIsSmartphoneResolutionVerticalFocused",
	setSmartphoneRamCapacity: "setSmartphoneRamCapacity",
	setIsSmartphoneRamCapacityValid: "setIsSmartphoneRamCapacityValid",
	setIsSmartphoneRamCapacityFocused: "setIsSmartphoneRamCapacityFocused",
	setSmartphoneRamCapacityUnit: "setSmartphoneRamCapacityUnit",
	setSmartphoneStorageCapacity: "setSmartphoneStorageCapacity",
	setIsSmartphoneStorageCapacityValid: "setIsSmartphoneStorageCapacityValid",
	setIsSmartphoneStorageCapacityFocused:
		"setIsSmartphoneStorageCapacityFocused",
	setSmartphoneBatteryCapacity: "setSmartphoneBatteryCapacity",
	setIsSmartphoneBatteryCapacityValid: "setIsSmartphoneBatteryCapacityValid",
	setIsSmartphoneBatteryCapacityFocused:
		"setIsSmartphoneBatteryCapacityFocused",
	setSmartphoneCamera: "setSmartphoneCamera",
	setIsSmartphoneCameraValid: "setIsSmartphoneCameraValid",
	setIsSmartphoneCameraFocused: "setIsSmartphoneCameraFocused",
	setSmartphoneColor: "setSmartphoneColor",
	setIsSmartphoneColorValid: "setIsSmartphoneColorValid",
	setIsSmartphoneColorFocused: "setIsSmartphoneColorFocused",
	setSmartphoneFieldsAdditionalMap: "setSmartphoneFieldsAdditionalMap",
	setAreSmartphoneFieldsAdditionalMapFocused:
		"setAreSmartphoneFieldsAdditionalMapFocused",
	setAreSmartphoneFieldsAdditionalMapValid:
		"setAreSmartphoneFieldsAdditionalMapValid",

	// ╭─────────────────────────────────────────────────────────────────╮
	//    SPEAKER
	// ╰─────────────────────────────────────────────────────────────────╯
	setSpeakerType: "setSpeakerType",
	setSpeakerTotalWattage: "setSpeakerTotalWattage",
	setIsSpeakerTotalWattageValid: "setIsSpeakerTotalWattageValid",
	setIsSpeakerTotalWattageFocused: "setIsSpeakerTotalWattageFocused",
	setSpeakerFrequencyResponse: "setSpeakerFrequencyResponse",
	setIsSpeakerFrequencyResponseValid: "setIsSpeakerFrequencyResponseValid",
	setIsSpeakerFrequencyResponseFocused: "setIsSpeakerFrequencyResponseFocused",
	setSpeakerColor: "setSpeakerColor",
	setIsSpeakerColorValid: "setIsSpeakerColorValid",
	setIsSpeakerColorFocused: "setIsSpeakerColorFocused",
	setSpeakerInterface: "setSpeakerInterface",
	setSpeakerFieldsAdditionalMap: "setSpeakerFieldsAdditionalMap",
	setAreSpeakerFieldsAdditionalMapFocused:
		"setAreSpeakerFieldsAdditionalMapFocused",
	setAreSpeakerFieldsAdditionalMapValid:
		"setAreSpeakerFieldsAdditionalMapValid",

	// ╭─────────────────────────────────────────────────────────────────╮
	//    STORAGE
	// ╰─────────────────────────────────────────────────────────────────╯
	setStorageType: "setStorageType",
	setStorageCapacity: "setStorageCapacity",
	setIsStorageCapacityValid: "setIsStorageCapacityValid",
	setIsStorageCapacityFocused: "setIsStorageCapacityFocused",
	setStorageCapacityUnit: "setStorageCapacityUnit",
	setStorageCacheCapacity: "setStorageCacheCapacity",
	setIsStorageCacheCapacityValid: "setIsStorageCacheCapacityValid",
	setIsStorageCacheCapacityFocused: "setIsStorageCacheCapacityFocused",
	setStorageCacheCapacityUnit: "setStorageCacheCapacityUnit",
	setStorageFormFactor: "setStorageFormFactor",
	setStorageInterface: "setStorageInterface",
	setStorageFieldsAdditionalMap: "setStorageFieldsAdditionalMap",
	setAreStorageFieldsAdditionalMapFocused:
		"setAreStorageFieldsAdditionalMapFocused",
	setAreStorageFieldsAdditionalMapValid:
		"setAreStorageFieldsAdditionalMapValid",

	// ╭─────────────────────────────────────────────────────────────────╮
	//    TABLET
	// ╰─────────────────────────────────────────────────────────────────╯
	setTabletOs: "setTabletOs",
	setTabletChipset: "setTabletChipset",
	setIsTabletChipsetValid: "setIsTabletChipsetValid",
	setIsTabletChipsetFocused: "setIsTabletChipsetFocused",
	setTabletDisplay: "setTabletDisplay",
	setIsTabletDisplayValid: "setIsTabletDisplayValid",
	setIsTabletDisplayFocused: "setIsTabletDisplayFocused",
	setTabletResolutionHorizontal: "setTabletResolutionHorizontal",
	setIsTabletResolutionHorizontalValid: "setIsTabletResolutionHorizontalValid",
	setIsTabletResolutionHorizontalFocused:
		"setIsTabletResolutionHorizontalFocused",
	setTabletResolutionVertical: "setTabletResolutionVertical",
	setIsTabletResolutionVerticalValid: "setIsTabletResolutionVerticalValid",
	setIsTabletResolutionVerticalFocused: "setIsTabletResolutionVerticalFocused",
	setTabletRamCapacity: "setTabletRamCapacity",
	setIsTabletRamCapacityValid: "setIsTabletRamCapacityValid",
	setIsTabletRamCapacityFocused: "setIsTabletRamCapacityFocused",
	setTabletRamCapacityUnit: "setTabletRamCapacityUnit",
	setTabletStorageCapacity: "setTabletStorageCapacity",
	setIsTabletStorageCapacityValid: "setIsTabletStorageCapacityValid",
	setIsTabletStorageCapacityFocused: "setIsTabletStorageCapacityFocused",
	setTabletBatteryCapacity: "setTabletBatteryCapacity",
	setIsTabletBatteryCapacityValid: "setIsTabletBatteryCapacityValid",
	setIsTabletBatteryCapacityFocused: "setIsTabletBatteryCapacityFocused",
	setTabletCamera: "setTabletCamera",
	setIsTabletCameraValid: "setIsTabletCameraValid",
	setIsTabletCameraFocused: "setIsTabletCameraFocused",
	setTabletColor: "setTabletColor",
	setIsTabletColorValid: "setIsTabletColorValid",
	setIsTabletColorFocused: "setIsTabletColorFocused",
	setTabletFieldsAdditionalMap: "setTabletFieldsAdditionalMap",
	setAreTabletFieldsAdditionalMapFocused:
		"setAreTabletFieldsAdditionalMapFocused",
	setAreTabletFieldsAdditionalMapValid: "setAreTabletFieldsAdditionalMapValid",

	// ╭─────────────────────────────────────────────────────────────────╮
	//    WEBCAM
	// ╰─────────────────────────────────────────────────────────────────╯
	setWebcamResolution: "setWebcamResolution",
	setWebcamInterface: "setWebcamInterface",
	setWebcamMicrophone: "setWebcamMicrophone",
	setWebcamFrameRate: "setWebcamFrameRate",
	setWebcamColor: "setWebcamColor",
	setIsWebcamColorValid: "setIsWebcamColorValid",
	setIsWebcamColorFocused: "setIsWebcamColorFocused",
	setWebcamFieldsAdditionalMap: "setWebcamFieldsAdditionalMap",
	setAreWebcamFieldsAdditionalMapFocused:
		"setAreWebcamFieldsAdditionalMapFocused",
	setAreWebcamFieldsAdditionalMapValid: "setAreWebcamFieldsAdditionalMapValid",

	// ╔═════════════════════════════════════════════════════════════════╗
	//    PAGE 3
	// ╚═════════════════════════════════════════════════════════════════╝
	setImgFormDataArray: "setImgFormDataArray",
	setAreImagesValid: "setAreImagesValid",

	// ╔═════════════════════════════════════════════════════════════════╗
	//    MISC.
	// ╚═════════════════════════════════════════════════════════════════╝
	setTriggerFormSubmit: "setTriggerFormSubmit",
	setCurrentStepperPosition: "setCurrentStepperPosition",
	setStepsInError: "setStepsInError",

	setIsSubmitting: "setIsSubmitting",
	setSubmitMessage: "setSubmitMessage",
	setIsSuccessful: "setIsSuccessful",
	setSuccessMessage: "setSuccessMessage",
};

export { createProductAction };
