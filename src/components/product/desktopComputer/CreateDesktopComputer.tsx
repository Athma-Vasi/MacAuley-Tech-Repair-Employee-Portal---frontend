import { Group, MantineNumberSize, Stack, Title } from "@mantine/core";

import {
  CaseSidePanel,
  CaseType,
  CreateProductAction,
  DisplayPanelType,
  KeyboardBacklight,
  KeyboardLayout,
  KeyboardSwitch,
  MemoryType,
  MemoryUnit,
  MotherboardFormFactor,
  MouseSensor,
  PeripheralsInterface,
  PsuEfficiency,
  PsuFormFactor,
  PsuModularity,
  SpeakerInterface,
  SpeakerType,
  StorageFormFactor,
  StorageInterface,
  StorageType,
} from "../types";
import CreateCase from "../case/CreateCase";
import CreateCpu from "../cpu/CreateCpu";
import { CreateProductDispatch } from "../dispatch";
import CreateDisplay from "../display/CreateDisplay";
import CreateGpu from "../gpu/CreateGpu";
import CreateKeyboard from "../keyboard/CreateKeyboard";
import CreateMotherboard from "../motherboard/CreateMotherboard";
import CreateMouse from "../mouse/CreateMouse";
import CreatePsu from "../psu/CreatePSU";
import CreateRam from "../ram/CreateRAM";
import CreateSpeaker from "../speaker/CreateSpeaker";
import CreateStorage from "../storage/CreateStorage";

type CreateDesktopComputerProps = {
  // ╭─────────────────────────────────────────────────────────────────╮
  //    CASE INPUTS
  // ╰─────────────────────────────────────────────────────────────────╯
  areCaseFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areCaseFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  caseColor: string;
  caseFieldsAdditionalMap: Map<number, [string, string]>;
  caseSidePanel: CaseSidePanel;
  caseType: CaseType;
  isCaseColorFocused: boolean;
  isCaseColorValid: boolean;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU INPUTS
  // ╰─────────────────────────────────────────────────────────────────╯
  areCpuFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areCpuFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  cpuCores: string;
  cpuFieldsAdditionalMap: Map<number, [string, string]>;
  cpuFrequency: string;
  cpuL1CacheCapacity: string;
  cpuL1CacheCapacityUnit: MemoryUnit;
  cpuL2CacheCapacity: string;
  cpuL2CacheCapacityUnit: MemoryUnit;
  cpuL3CacheCapacity: string;
  cpuL3CacheCapacityUnit: MemoryUnit;
  cpuSocket: string;
  cpuWattage: string;
  isCpuCoresFocused: boolean;
  isCpuCoresValid: boolean;
  isCpuFrequencyFocused: boolean;
  isCpuFrequencyValid: boolean;
  isCpuL1CacheCapacityFocused: boolean;
  isCpuL1CacheCapacityValid: boolean;
  isCpuL2CacheCapacityFocused: boolean;
  isCpuL2CacheCapacityValid: boolean;
  isCpuL3CacheCapacityFocused: boolean;
  isCpuL3CacheCapacityValid: boolean;
  isCpuSocketFocused: boolean;
  isCpuSocketValid: boolean;
  isCpuWattageFocused: boolean;
  isCpuWattageValid: boolean;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    DISPLAY INPUTS
  // ╰─────────────────────────────────────────────────────────────────╯
  areDisplayFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areDisplayFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  displayAspectRatio: string;
  displayFieldsAdditionalMap: Map<number, [string, string]>;
  displayPanelType: DisplayPanelType;
  displayRefreshRate: string;
  displayResolutionHorizontal: string;
  displayResolutionVertical: string;
  displayResponseTime: string;
  displaySize: string; // inches
  isDisplayAspectRatioFocused: boolean;
  isDisplayAspectRatioValid: boolean;
  isDisplayRefreshRateFocused: boolean;
  isDisplayRefreshRateValid: boolean;
  isDisplayResolutionHorizontalFocused: boolean;
  isDisplayResolutionHorizontalValid: boolean;
  isDisplayResolutionVerticalFocused: boolean;
  isDisplayResolutionVerticalValid: boolean;
  isDisplayResponseTimeFocused: boolean;
  isDisplayResponseTimeValid: boolean;
  isDisplaySizeFocused: boolean;
  isDisplaySizeValid: boolean;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    GPU INPUTS
  // ╰─────────────────────────────────────────────────────────────────╯
  areGpuFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areGpuFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  gpuBoostClock: string;
  gpuChipset: string;
  gpuCoreClock: string;
  gpuFieldsAdditionalMap: Map<number, [string, string]>;
  gpuMemoryCapacity: string;
  gpuMemoryCapacityUnit: MemoryUnit;
  gpuTdp: string;
  isGpuBoostClockFocused: boolean;
  isGpuBoostClockValid: boolean;
  isGpuChipsetFocused: boolean;
  isGpuChipsetValid: boolean;
  isGpuCoreClockFocused: boolean;
  isGpuCoreClockValid: boolean;
  isGpuMemoryCapacityFocused: boolean;
  isGpuMemoryCapacityValid: boolean;
  isGpuTdpFocused: boolean;
  isGpuTdpValid: boolean;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    KEYBOARD INPUTS
  // ╰─────────────────────────────────────────────────────────────────╯
  areKeyboardFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areKeyboardFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  keyboardBacklight: KeyboardBacklight;
  keyboardFieldsAdditionalMap: Map<number, [string, string]>;
  keyboardInterface: PeripheralsInterface;
  keyboardLayout: KeyboardLayout;
  keyboardSwitch: KeyboardSwitch;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOTHERBOARD INPUTS
  // ╰─────────────────────────────────────────────────────────────────╯
  areMotherboardFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areMotherboardFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  isMotherboardChipsetFocused: boolean;
  isMotherboardChipsetValid: boolean;
  isMotherboardM2SlotsFocused: boolean;
  isMotherboardM2SlotsValid: boolean;
  isMotherboardMemoryMaxCapacityFocused: boolean;
  isMotherboardMemoryMaxCapacityValid: boolean;
  isMotherboardMemorySlotsFocused: boolean;
  isMotherboardMemorySlotsValid: boolean;
  isMotherboardPcie3SlotsFocused: boolean;
  isMotherboardPcie3SlotsValid: boolean;
  isMotherboardPcie4SlotsFocused: boolean;
  isMotherboardPcie4SlotsValid: boolean;
  isMotherboardPcie5SlotsFocused: boolean;
  isMotherboardPcie5SlotsValid: boolean;
  isMotherboardSataPortsFocused: boolean;
  isMotherboardSataPortsValid: boolean;
  isMotherboardSocketFocused: boolean;
  isMotherboardSocketValid: boolean;
  motherboardChipset: string;
  motherboardFieldsAdditionalMap: Map<number, [string, string]>;
  motherboardFormFactor: MotherboardFormFactor;
  motherboardM2Slots: string;
  motherboardMemoryMaxCapacity: string;
  motherboardMemoryMaxCapacityUnit: MemoryUnit;
  motherboardMemorySlots: string;
  motherboardMemoryType: MemoryType;
  motherboardPcie3Slots: string;
  motherboardPcie4Slots: string;
  motherboardPcie5Slots: string;
  motherboardSataPorts: string;
  motherboardSocket: string;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    MOUSE INPUTS
  // ╰─────────────────────────────────────────────────────────────────╯
  areMouseFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areMouseFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  isMouseButtonsFocused: boolean;
  isMouseButtonsValid: boolean;
  isMouseColorFocused: boolean;
  isMouseColorValid: boolean;
  isMouseDpiFocused: boolean;
  isMouseDpiValid: boolean;
  mouseButtons: string;
  mouseColor: string;
  mouseDpi: string;
  mouseFieldsAdditionalMap: Map<number, [string, string]>;
  mouseInterface: PeripheralsInterface;
  mouseSensor: MouseSensor;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    PSU INPUTS
  // ╰─────────────────────────────────────────────────────────────────╯
  arePsuFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  arePsuFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  isPsuWattageFocused: boolean;
  isPsuWattageValid: boolean;
  psuEfficiency: PsuEfficiency;
  psuFieldsAdditionalMap: Map<number, [string, string]>;
  psuFormFactor: PsuFormFactor;
  psuModularity: PsuModularity;
  psuWattage: string;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    RAM INPUTS
  // ╰─────────────────────────────────────────────────────────────────╯
  areRamFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areRamFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  isRamColorFocused: boolean;
  isRamColorValid: boolean;
  isRamDataRateFocused: boolean;
  isRamDataRateValid: boolean;
  isRamModulesCapacityFocused: boolean;
  isRamModulesCapacityValid: boolean;
  isRamModulesQuantityFocused: boolean;
  isRamModulesQuantityValid: boolean;
  isRamTimingFocused: boolean;
  isRamTimingValid: boolean;
  isRamVoltageFocused: boolean;
  isRamVoltageValid: boolean;
  ramColor: string;
  ramDataRate: string;
  ramFieldsAdditionalMap: Map<number, [string, string]>;
  ramModulesCapacity: string;
  ramModulesCapacityUnit: MemoryUnit;
  ramModulesQuantity: string;
  ramTiming: string;
  ramType: MemoryType;
  ramVoltage: string;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    SPEAKER INPUTS
  // ╰─────────────────────────────────────────────────────────────────╯
  areSpeakerFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areSpeakerFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  isSpeakerColorFocused: boolean;
  isSpeakerColorValid: boolean;
  isSpeakerFrequencyResponseFocused: boolean;
  isSpeakerFrequencyResponseValid: boolean;
  isSpeakerTotalWattageFocused: boolean;
  isSpeakerTotalWattageValid: boolean;
  speakerColor: string;
  speakerFieldsAdditionalMap: Map<number, [string, string]>;
  speakerFrequencyResponse: string;
  speakerInterface: SpeakerInterface;
  speakerTotalWattage: string;
  speakerType: SpeakerType;

  // ╭─────────────────────────────────────────────────────────────────╮
  //    STORAGE INPUTS
  // ╰─────────────────────────────────────────────────────────────────╯
  areStorageFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areStorageFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  isStorageCacheCapacityFocused: boolean;
  isStorageCacheCapacityValid: boolean;
  isStorageCapacityFocused: boolean;
  isStorageCapacityValid: boolean;
  storageCacheCapacity: string;
  storageCacheCapacityUnit: MemoryUnit;
  storageCapacity: string;
  storageCapacityUnit: MemoryUnit;
  storageFieldsAdditionalMap: Map<number, [string, string]>;
  storageFormFactor: StorageFormFactor;
  storageInterface: StorageInterface;
  storageType: StorageType;

  // misc.
  borderColor: string;
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  currentlySelectedAdditionalFieldIndex: number;
  padding: MantineNumberSize;
};

function CreateDesktopComputer({
  areCaseFieldsAdditionalMapFocused,
  areCaseFieldsAdditionalMapValid,
  caseColor,
  caseFieldsAdditionalMap,
  caseSidePanel,
  caseType,
  isCaseColorFocused,
  isCaseColorValid,

  isCpuWattageValid,
  isCpuWattageFocused,
  isCpuSocketValid,
  isCpuSocketFocused,
  isCpuL3CacheCapacityValid,
  isCpuL3CacheCapacityFocused,
  isCpuL2CacheCapacityValid,
  isCpuL2CacheCapacityFocused,
  isCpuL1CacheCapacityValid,
  isCpuL1CacheCapacityFocused,
  isCpuFrequencyValid,
  isCpuFrequencyFocused,
  isCpuCoresValid,
  isCpuCoresFocused,
  cpuWattage,
  cpuSocket,
  cpuL3CacheCapacityUnit,
  cpuL3CacheCapacity,
  cpuL2CacheCapacityUnit,
  cpuL2CacheCapacity,
  cpuL1CacheCapacityUnit,
  cpuL1CacheCapacity,
  cpuFrequency,
  cpuFieldsAdditionalMap,
  cpuCores,
  areCpuFieldsAdditionalMapValid,
  areCpuFieldsAdditionalMapFocused,

  areDisplayFieldsAdditionalMapFocused,
  areDisplayFieldsAdditionalMapValid,
  displayAspectRatio,
  displayFieldsAdditionalMap,
  displayPanelType,
  displayRefreshRate,
  displayResolutionHorizontal,
  displayResolutionVertical,
  displayResponseTime,
  displaySize,
  isDisplayAspectRatioFocused,
  isDisplayAspectRatioValid,
  isDisplayRefreshRateFocused,
  isDisplayRefreshRateValid,
  isDisplayResolutionHorizontalFocused,
  isDisplayResolutionHorizontalValid,
  isDisplayResolutionVerticalFocused,
  isDisplayResolutionVerticalValid,
  isDisplayResponseTimeFocused,
  isDisplayResponseTimeValid,
  isDisplaySizeFocused,
  isDisplaySizeValid,

  areGpuFieldsAdditionalMapFocused,
  areGpuFieldsAdditionalMapValid,
  gpuBoostClock,
  gpuChipset,
  gpuCoreClock,
  gpuFieldsAdditionalMap,
  gpuMemoryCapacity,
  gpuMemoryCapacityUnit,
  gpuTdp,
  isGpuBoostClockFocused,
  isGpuBoostClockValid,
  isGpuChipsetFocused,
  isGpuChipsetValid,
  isGpuCoreClockFocused,
  isGpuCoreClockValid,
  isGpuMemoryCapacityFocused,
  isGpuMemoryCapacityValid,
  isGpuTdpFocused,
  isGpuTdpValid,

  areKeyboardFieldsAdditionalMapFocused,
  areKeyboardFieldsAdditionalMapValid,
  keyboardBacklight,
  keyboardFieldsAdditionalMap,
  keyboardInterface,
  keyboardLayout,
  keyboardSwitch,

  areMotherboardFieldsAdditionalMapFocused,
  areMotherboardFieldsAdditionalMapValid,
  isMotherboardChipsetFocused,
  isMotherboardChipsetValid,
  isMotherboardM2SlotsFocused,
  isMotherboardM2SlotsValid,
  isMotherboardMemoryMaxCapacityFocused,
  isMotherboardMemoryMaxCapacityValid,
  isMotherboardMemorySlotsFocused,
  isMotherboardMemorySlotsValid,
  isMotherboardPcie3SlotsFocused,
  isMotherboardPcie3SlotsValid,
  isMotherboardPcie4SlotsFocused,
  isMotherboardPcie4SlotsValid,
  isMotherboardPcie5SlotsFocused,
  isMotherboardPcie5SlotsValid,
  isMotherboardSataPortsFocused,
  isMotherboardSataPortsValid,
  isMotherboardSocketFocused,
  isMotherboardSocketValid,
  motherboardChipset,
  motherboardFieldsAdditionalMap,
  motherboardFormFactor,
  motherboardM2Slots,
  motherboardMemoryMaxCapacity,
  motherboardMemoryMaxCapacityUnit,
  motherboardMemorySlots,
  motherboardMemoryType,
  motherboardPcie3Slots,
  motherboardPcie4Slots,
  motherboardPcie5Slots,
  motherboardSataPorts,
  motherboardSocket,

  areMouseFieldsAdditionalMapFocused,
  areMouseFieldsAdditionalMapValid,
  isMouseButtonsFocused,
  isMouseButtonsValid,
  isMouseColorFocused,
  isMouseColorValid,
  isMouseDpiFocused,
  isMouseDpiValid,
  mouseButtons,
  mouseColor,
  mouseDpi,
  mouseFieldsAdditionalMap,
  mouseInterface,
  mouseSensor,

  arePsuFieldsAdditionalMapFocused,
  arePsuFieldsAdditionalMapValid,
  isPsuWattageFocused,
  isPsuWattageValid,
  psuEfficiency,
  psuFieldsAdditionalMap,
  psuFormFactor,
  psuModularity,
  psuWattage,

  areRamFieldsAdditionalMapFocused,
  areRamFieldsAdditionalMapValid,
  isRamColorFocused,
  isRamColorValid,
  isRamDataRateFocused,
  isRamDataRateValid,
  isRamModulesCapacityFocused,
  isRamModulesCapacityValid,
  isRamModulesQuantityFocused,
  isRamModulesQuantityValid,
  isRamTimingFocused,
  isRamTimingValid,
  isRamVoltageFocused,
  isRamVoltageValid,
  ramColor,
  ramDataRate,
  ramFieldsAdditionalMap,
  ramModulesCapacity,
  ramModulesCapacityUnit,
  ramModulesQuantity,
  ramTiming,
  ramType,
  ramVoltage,

  areSpeakerFieldsAdditionalMapFocused,
  areSpeakerFieldsAdditionalMapValid,
  isSpeakerColorFocused,
  isSpeakerColorValid,
  isSpeakerFrequencyResponseFocused,
  isSpeakerFrequencyResponseValid,
  isSpeakerTotalWattageFocused,
  isSpeakerTotalWattageValid,
  speakerColor,
  speakerFieldsAdditionalMap,
  speakerFrequencyResponse,
  speakerInterface,
  speakerTotalWattage,
  speakerType,

  areStorageFieldsAdditionalMapFocused,
  areStorageFieldsAdditionalMapValid,
  isStorageCacheCapacityFocused,
  isStorageCacheCapacityValid,
  isStorageCapacityFocused,
  isStorageCapacityValid,
  storageCacheCapacity,
  storageCacheCapacityUnit,
  storageCapacity,
  storageCapacityUnit,
  storageFieldsAdditionalMap,
  storageFormFactor,
  storageInterface,
  storageType,

  borderColor,
  createProductAction,
  createProductDispatch,
  currentlySelectedAdditionalFieldIndex,
  padding,
}: CreateDesktopComputerProps) {
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╔═════════════════════════════════════════════════════════════════╗
  //   DISPLAY CASE SPECIFICATIONS INPUTS
  // ╚═════════════════════════════════════════════════════════════════╝
  const displayCaseSpecificationsInputs = (
    <CreateCase
      areCaseFieldsAdditionalMapFocused={areCaseFieldsAdditionalMapFocused}
      areCaseFieldsAdditionalMapValid={areCaseFieldsAdditionalMapValid}
      caseColor={caseColor}
      caseFieldsAdditionalMap={caseFieldsAdditionalMap}
      caseSidePanel={caseSidePanel}
      caseType={caseType}
      createProductAction={createProductAction}
      createProductDispatch={createProductDispatch}
      currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
      isCaseColorFocused={isCaseColorFocused}
      isCaseColorValid={isCaseColorValid}
      padding={padding}
    />
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   DISPLAY CPU SPECIFICATIONS INPUTS
  // ╚═════════════════════════════════════════════════════════════════╝
  const displayCpuSpecificationsInputs = (
    <CreateCpu
      areCpuFieldsAdditionalMapFocused={areCpuFieldsAdditionalMapFocused}
      areCpuFieldsAdditionalMapValid={areCpuFieldsAdditionalMapValid}
      cpuCores={cpuCores}
      cpuFieldsAdditionalMap={cpuFieldsAdditionalMap}
      cpuFrequency={cpuFrequency}
      cpuL1CacheCapacity={cpuL1CacheCapacity}
      cpuL1CacheCapacityUnit={cpuL1CacheCapacityUnit}
      cpuL2CacheCapacity={cpuL2CacheCapacity}
      cpuL2CacheCapacityUnit={cpuL2CacheCapacityUnit}
      cpuL3CacheCapacity={cpuL3CacheCapacity}
      cpuL3CacheCapacityUnit={cpuL3CacheCapacityUnit}
      cpuSocket={cpuSocket}
      cpuWattage={cpuWattage}
      createProductAction={createProductAction}
      createProductDispatch={createProductDispatch}
      currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
      isCpuCoresFocused={isCpuCoresFocused}
      isCpuCoresValid={isCpuCoresValid}
      isCpuFrequencyFocused={isCpuFrequencyFocused}
      isCpuFrequencyValid={isCpuFrequencyValid}
      isCpuL1CacheCapacityFocused={isCpuL1CacheCapacityFocused}
      isCpuL1CacheCapacityValid={isCpuL1CacheCapacityValid}
      isCpuL2CacheCapacityFocused={isCpuL2CacheCapacityFocused}
      isCpuL2CacheCapacityValid={isCpuL2CacheCapacityValid}
      isCpuL3CacheCapacityFocused={isCpuL3CacheCapacityFocused}
      isCpuL3CacheCapacityValid={isCpuL3CacheCapacityValid}
      isCpuSocketFocused={isCpuSocketFocused}
      isCpuSocketValid={isCpuSocketValid}
      isCpuWattageFocused={isCpuWattageFocused}
      isCpuWattageValid={isCpuWattageValid}
      padding={padding}
    />
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   DISPLAY DISPLAY (MONITOR) SPECIFICATIONS INPUTS
  // ╚═════════════════════════════════════════════════════════════════╝
  const displayDisplaySpecificationsInputs = (
    <CreateDisplay
      areDisplayFieldsAdditionalMapFocused={areDisplayFieldsAdditionalMapFocused}
      areDisplayFieldsAdditionalMapValid={areDisplayFieldsAdditionalMapValid}
      createProductAction={createProductAction}
      createProductDispatch={createProductDispatch}
      currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
      displayAspectRatio={displayAspectRatio}
      displayFieldsAdditionalMap={displayFieldsAdditionalMap}
      displayPanelType={displayPanelType}
      displayRefreshRate={displayRefreshRate}
      displayResolutionHorizontal={displayResolutionHorizontal}
      displayResolutionVertical={displayResolutionVertical}
      displayResponseTime={displayResponseTime}
      displaySize={displaySize}
      isDisplayAspectRatioFocused={isDisplayAspectRatioFocused}
      isDisplayAspectRatioValid={isDisplayAspectRatioValid}
      isDisplayRefreshRateFocused={isDisplayRefreshRateFocused}
      isDisplayRefreshRateValid={isDisplayRefreshRateValid}
      isDisplayResolutionHorizontalFocused={isDisplayResolutionHorizontalFocused}
      isDisplayResolutionHorizontalValid={isDisplayResolutionHorizontalValid}
      isDisplayResolutionVerticalFocused={isDisplayResolutionVerticalFocused}
      isDisplayResolutionVerticalValid={isDisplayResolutionVerticalValid}
      isDisplayResponseTimeFocused={isDisplayResponseTimeFocused}
      isDisplayResponseTimeValid={isDisplayResponseTimeValid}
      isDisplaySizeFocused={isDisplaySizeFocused}
      isDisplaySizeValid={isDisplaySizeValid}
      padding={padding}
    />
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   DISPLAY GPU SPECIFICATIONS INPUTS
  // ╚═════════════════════════════════════════════════════════════════╝
  const displayGpuSpecificationsInputs = (
    <CreateGpu
      areGpuFieldsAdditionalMapFocused={areGpuFieldsAdditionalMapFocused}
      areGpuFieldsAdditionalMapValid={areGpuFieldsAdditionalMapValid}
      createProductAction={createProductAction}
      createProductDispatch={createProductDispatch}
      currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
      gpuBoostClock={gpuBoostClock}
      gpuChipset={gpuChipset}
      gpuCoreClock={gpuCoreClock}
      gpuFieldsAdditionalMap={gpuFieldsAdditionalMap}
      gpuMemoryCapacity={gpuMemoryCapacity}
      gpuMemoryCapacityUnit={gpuMemoryCapacityUnit}
      gpuTdp={gpuTdp}
      isGpuBoostClockFocused={isGpuBoostClockFocused}
      isGpuBoostClockValid={isGpuBoostClockValid}
      isGpuChipsetFocused={isGpuChipsetFocused}
      isGpuChipsetValid={isGpuChipsetValid}
      isGpuCoreClockFocused={isGpuCoreClockFocused}
      isGpuCoreClockValid={isGpuCoreClockValid}
      isGpuMemoryCapacityFocused={isGpuMemoryCapacityFocused}
      isGpuMemoryCapacityValid={isGpuMemoryCapacityValid}
      isGpuTdpFocused={isGpuTdpFocused}
      isGpuTdpValid={isGpuTdpValid}
      padding={padding}
    />
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   DISPLAY KEYBOARD SPECIFICATIONS INPUTS
  // ╚═════════════════════════════════════════════════════════════════╝
  const displayKeyboardSpecificationsInputs = (
    <CreateKeyboard
      areKeyboardFieldsAdditionalMapFocused={areKeyboardFieldsAdditionalMapFocused}
      areKeyboardFieldsAdditionalMapValid={areKeyboardFieldsAdditionalMapValid}
      createProductAction={createProductAction}
      createProductDispatch={createProductDispatch}
      currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
      keyboardBacklight={keyboardBacklight}
      keyboardFieldsAdditionalMap={keyboardFieldsAdditionalMap}
      keyboardInterface={keyboardInterface}
      keyboardLayout={keyboardLayout}
      keyboardSwitch={keyboardSwitch}
      padding={padding}
    />
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   DISPLAY MOTHERBOARD SPECIFICATIONS INPUTS
  // ╚═════════════════════════════════════════════════════════════════╝
  const displayMotherboardSpecificationsInputs = (
    <CreateMotherboard
      areMotherboardFieldsAdditionalMapFocused={areMotherboardFieldsAdditionalMapFocused}
      areMotherboardFieldsAdditionalMapValid={areMotherboardFieldsAdditionalMapValid}
      createProductAction={createProductAction}
      createProductDispatch={createProductDispatch}
      currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
      isMotherboardChipsetFocused={isMotherboardChipsetFocused}
      isMotherboardChipsetValid={isMotherboardChipsetValid}
      isMotherboardM2SlotsFocused={isMotherboardM2SlotsFocused}
      isMotherboardM2SlotsValid={isMotherboardM2SlotsValid}
      isMotherboardMemoryMaxCapacityFocused={isMotherboardMemoryMaxCapacityFocused}
      isMotherboardMemoryMaxCapacityValid={isMotherboardMemoryMaxCapacityValid}
      isMotherboardMemorySlotsFocused={isMotherboardMemorySlotsFocused}
      isMotherboardMemorySlotsValid={isMotherboardMemorySlotsValid}
      isMotherboardPcie3SlotsFocused={isMotherboardPcie3SlotsFocused}
      isMotherboardPcie3SlotsValid={isMotherboardPcie3SlotsValid}
      isMotherboardPcie4SlotsFocused={isMotherboardPcie4SlotsFocused}
      isMotherboardPcie4SlotsValid={isMotherboardPcie4SlotsValid}
      isMotherboardPcie5SlotsFocused={isMotherboardPcie5SlotsFocused}
      isMotherboardPcie5SlotsValid={isMotherboardPcie5SlotsValid}
      isMotherboardSataPortsFocused={isMotherboardSataPortsFocused}
      isMotherboardSataPortsValid={isMotherboardSataPortsValid}
      isMotherboardSocketFocused={isMotherboardSocketFocused}
      isMotherboardSocketValid={isMotherboardSocketValid}
      motherboardChipset={motherboardChipset}
      motherboardFieldsAdditionalMap={motherboardFieldsAdditionalMap}
      motherboardFormFactor={motherboardFormFactor}
      motherboardM2Slots={motherboardM2Slots}
      motherboardMemoryMaxCapacity={motherboardMemoryMaxCapacity}
      motherboardMemoryMaxCapacityUnit={motherboardMemoryMaxCapacityUnit}
      motherboardMemorySlots={motherboardMemorySlots}
      motherboardMemoryType={motherboardMemoryType}
      motherboardPcie3Slots={motherboardPcie3Slots}
      motherboardPcie4Slots={motherboardPcie4Slots}
      motherboardPcie5Slots={motherboardPcie5Slots}
      motherboardSataPorts={motherboardSataPorts}
      motherboardSocket={motherboardSocket}
      padding={padding}
    />
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   DISPLAY MOUSE SPECIFICATIONS INPUTS
  // ╚═════════════════════════════════════════════════════════════════╝
  const displayMouseSpecificationsInputs = (
    <CreateMouse
      areMouseFieldsAdditionalMapFocused={areMouseFieldsAdditionalMapFocused}
      areMouseFieldsAdditionalMapValid={areMouseFieldsAdditionalMapValid}
      createProductAction={createProductAction}
      createProductDispatch={createProductDispatch}
      currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
      isMouseButtonsFocused={isMouseButtonsFocused}
      isMouseButtonsValid={isMouseButtonsValid}
      isMouseColorFocused={isMouseColorFocused}
      isMouseColorValid={isMouseColorValid}
      isMouseDpiFocused={isMouseDpiFocused}
      isMouseDpiValid={isMouseDpiValid}
      mouseButtons={mouseButtons}
      mouseColor={mouseColor}
      mouseDpi={mouseDpi}
      mouseFieldsAdditionalMap={mouseFieldsAdditionalMap}
      mouseInterface={mouseInterface}
      mouseSensor={mouseSensor}
      padding={padding}
    />
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   DISPLAY PSU SPECIFICATIONS INPUTS
  // ╚═════════════════════════════════════════════════════════════════╝
  const displayPsuSpecificationsInputs = (
    <CreatePsu
      arePsuFieldsAdditionalMapFocused={arePsuFieldsAdditionalMapFocused}
      arePsuFieldsAdditionalMapValid={arePsuFieldsAdditionalMapValid}
      createProductAction={createProductAction}
      createProductDispatch={createProductDispatch}
      currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
      isPsuWattageFocused={isPsuWattageFocused}
      isPsuWattageValid={isPsuWattageValid}
      padding={padding}
      psuEfficiency={psuEfficiency}
      psuFieldsAdditionalMap={psuFieldsAdditionalMap}
      psuFormFactor={psuFormFactor}
      psuModularity={psuModularity}
      psuWattage={psuWattage}
    />
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   DISPLAY RAM SPECIFICATIONS INPUTS
  // ╚═════════════════════════════════════════════════════════════════╝
  const displayRamSpecificationsInputs = (
    <CreateRam
      areRamFieldsAdditionalMapFocused={areRamFieldsAdditionalMapFocused}
      areRamFieldsAdditionalMapValid={areRamFieldsAdditionalMapValid}
      createProductAction={createProductAction}
      createProductDispatch={createProductDispatch}
      currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
      isRamColorFocused={isRamColorFocused}
      isRamColorValid={isRamColorValid}
      isRamDataRateFocused={isRamDataRateFocused}
      isRamDataRateValid={isRamDataRateValid}
      isRamModulesCapacityFocused={isRamModulesCapacityFocused}
      isRamModulesCapacityValid={isRamModulesCapacityValid}
      isRamModulesQuantityFocused={isRamModulesQuantityFocused}
      isRamModulesQuantityValid={isRamModulesQuantityValid}
      isRamTimingFocused={isRamTimingFocused}
      isRamTimingValid={isRamTimingValid}
      isRamVoltageFocused={isRamVoltageFocused}
      isRamVoltageValid={isRamVoltageValid}
      padding={padding}
      ramColor={ramColor}
      ramDataRate={ramDataRate}
      ramFieldsAdditionalMap={ramFieldsAdditionalMap}
      ramModulesCapacity={ramModulesCapacity}
      ramModulesCapacityUnit={ramModulesCapacityUnit}
      ramModulesQuantity={ramModulesQuantity}
      ramTiming={ramTiming}
      ramType={ramType}
      ramVoltage={ramVoltage}
    />
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   DISPLAY SPEAKER SPECIFICATIONS INPUTS
  // ╚═════════════════════════════════════════════════════════════════╝
  const displaySpeakerSpecificationsInputs = (
    <CreateSpeaker
      areSpeakerFieldsAdditionalMapFocused={areSpeakerFieldsAdditionalMapFocused}
      areSpeakerFieldsAdditionalMapValid={areSpeakerFieldsAdditionalMapValid}
      createProductAction={createProductAction}
      createProductDispatch={createProductDispatch}
      currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
      isSpeakerColorFocused={isSpeakerColorFocused}
      isSpeakerColorValid={isSpeakerColorValid}
      isSpeakerFrequencyResponseFocused={isSpeakerFrequencyResponseFocused}
      isSpeakerFrequencyResponseValid={isSpeakerFrequencyResponseValid}
      isSpeakerTotalWattageFocused={isSpeakerTotalWattageFocused}
      isSpeakerTotalWattageValid={isSpeakerTotalWattageValid}
      padding={padding}
      speakerColor={speakerColor}
      speakerFieldsAdditionalMap={speakerFieldsAdditionalMap}
      speakerFrequencyResponse={speakerFrequencyResponse}
      speakerInterface={speakerInterface}
      speakerTotalWattage={speakerTotalWattage}
      speakerType={speakerType}
    />
  );

  // ╔═════════════════════════════════════════════════════════════════╗
  //   DISPLAY STORAGE SPECIFICATIONS INPUTS
  // ╚═════════════════════════════════════════════════════════════════╝
  const displayStorageSpecificationsInputs = (
    <CreateStorage
      areStorageFieldsAdditionalMapFocused={areStorageFieldsAdditionalMapFocused}
      areStorageFieldsAdditionalMapValid={areStorageFieldsAdditionalMapValid}
      createProductAction={createProductAction}
      createProductDispatch={createProductDispatch}
      currentlySelectedAdditionalFieldIndex={currentlySelectedAdditionalFieldIndex}
      isStorageCacheCapacityFocused={isStorageCacheCapacityFocused}
      isStorageCacheCapacityValid={isStorageCacheCapacityValid}
      isStorageCapacityFocused={isStorageCapacityFocused}
      isStorageCapacityValid={isStorageCapacityValid}
      padding={padding}
      storageCacheCapacity={storageCacheCapacity}
      storageCacheCapacityUnit={storageCacheCapacityUnit}
      storageCapacity={storageCapacity}
      storageCapacityUnit={storageCapacityUnit}
      storageFieldsAdditionalMap={storageFieldsAdditionalMap}
      storageFormFactor={storageFormFactor}
      storageInterface={storageInterface}
      storageType={storageType}
    />
  );

  const displayDesktopComputerSpecificationsInputs = (
    <Stack w="100%">
      <Title order={3}>Desktop Computer Specifications</Title>
      <Group style={{ borderBottom: borderColor }}>
        {displayCaseSpecificationsInputs}
      </Group>
      <Group style={{ borderBottom: borderColor }}>
        {displayCpuSpecificationsInputs}
      </Group>
      <Group style={{ borderBottom: borderColor }}>
        {displayDisplaySpecificationsInputs}
      </Group>
      <Group style={{ borderBottom: borderColor }}>
        {displayGpuSpecificationsInputs}
      </Group>
      <Group style={{ borderBottom: borderColor }}>
        {displayKeyboardSpecificationsInputs}
      </Group>
      <Group style={{ borderBottom: borderColor }}>
        {displayMotherboardSpecificationsInputs}
      </Group>
      <Group style={{ borderBottom: borderColor }}>
        {displayMouseSpecificationsInputs}
      </Group>
      <Group style={{ borderBottom: borderColor }}>
        {displayPsuSpecificationsInputs}
      </Group>
      <Group style={{ borderBottom: borderColor }}>
        {displayRamSpecificationsInputs}
      </Group>
      <Group style={{ borderBottom: borderColor }}>
        {displaySpeakerSpecificationsInputs}
      </Group>
      {displayStorageSpecificationsInputs}
    </Stack>
  );

  return displayDesktopComputerSpecificationsInputs;
}

export default CreateDesktopComputer;
