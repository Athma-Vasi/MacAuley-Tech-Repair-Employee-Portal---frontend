import { MantineNumberSize } from "@mantine/core";

import { CreateProductAction } from "../actions";
import { CreateProductDispatch } from "../dispatch";
import {
  CaseSidePanel,
  CaseType,
  DisplayPanelType,
  HeadphoneInterface,
  HeadphoneType,
  KeyboardBacklight,
  KeyboardLayout,
  KeyboardSwitch,
  MemoryType,
  MemoryUnit,
  MicrophoneInterface,
  MicrophonePolarPattern,
  MicrophoneType,
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
  WebcamFrameRate,
  WebcamInterface,
  WebcamMicrophone,
  WebcamResolution,
} from "../types";

type CreateDesktopComputerProps = {
  accessoryColor: string;
  accessoryFieldsAdditionalMap: Map<number, [string, string]>;
  accessoryInterface: PeripheralsInterface;
  accessoryType: string;
  borderColor: string;
  caseColor: string;
  caseFieldsAdditionalMap: Map<number, [string, string]>;
  caseSidePanel: CaseSidePanel;
  caseType: CaseType;
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
  createProductAction: CreateProductAction;
  createProductDispatch: React.Dispatch<CreateProductDispatch>;
  displayAspectRatio: string;
  displayFieldsAdditionalMap: Map<number, [string, string]>;
  displayPanelType: DisplayPanelType;
  displayRefreshRate: string;
  displayResolutionHorizontal: string;
  displayResolutionVertical: string;
  displayResponseTime: string;
  displaySize: string;
  gpuBoostClock: string;
  gpuChipset: string;
  gpuCoreClock: string;
  gpuFieldsAdditionalMap: Map<number, [string, string]>;
  gpuMemoryCapacity: string;
  gpuMemoryCapacityUnit: MemoryUnit;
  gpuTdp: string;
  headphoneColor: string;
  headphoneDriver: string;
  headphoneFieldsAdditionalMap: Map<number, [string, string]>;
  headphoneFrequencyResponse: string;
  headphoneImpedance: string;
  headphoneInterface: HeadphoneInterface;
  headphoneType: HeadphoneType;
  keyboardBacklight: KeyboardBacklight;
  keyboardFieldsAdditionalMap: Map<number, [string, string]>;
  keyboardInterface: PeripheralsInterface;
  keyboardLayout: KeyboardLayout;
  keyboardSwitch: KeyboardSwitch;
  microphoneColor: string;
  microphoneFieldsAdditionalMap: Map<number, [string, string]>;
  microphoneFrequencyResponse: string;
  microphoneInterface: MicrophoneInterface;
  microphonePolarPattern: MicrophonePolarPattern;
  microphoneType: MicrophoneType;
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
  mouseButtons: string;
  mouseColor: string;
  mouseDpi: string;
  mouseFieldsAdditionalMap: Map<number, [string, string]>;
  mouseInterface: PeripheralsInterface;
  mouseSensor: MouseSensor;
  padding: MantineNumberSize;
  psuEfficiency: PsuEfficiency;
  psuFieldsAdditionalMap: Map<number, [string, string]>;
  psuFormFactor: PsuFormFactor;
  psuModularity: PsuModularity;
  psuWattage: string;
  ramColor: string;
  ramDataRate: string;
  ramFieldsAdditionalMap: Map<number, [string, string]>;
  ramModulesCapacity: string;
  ramModulesCapacityUnit: MemoryUnit;
  ramModulesQuantity: string;
  ramTiming: string;
  ramType: MemoryType;
  ramVoltage: string;
  speakerColor: string;
  speakerFieldsAdditionalMap: Map<number, [string, string]>;
  speakerFrequencyResponse: string;
  speakerInterface: SpeakerInterface;
  speakerTotalWattage: string;
  speakerType: SpeakerType;
  storageCacheCapacity: string;
  storageCacheCapacityUnit: MemoryUnit;
  storageCapacity: string;
  storageCapacityUnit: MemoryUnit;
  storageFieldsAdditionalMap: Map<number, [string, string]>;
  storageFormFactor: StorageFormFactor;
  storageInterface: StorageInterface;
  storageType: StorageType;
  webcamColor: string;
  webcamFieldsAdditionalMap: Map<number, [string, string]>;
  webcamFrameRate: WebcamFrameRate;
  webcamInterface: WebcamInterface;
  webcamMicrophone: WebcamMicrophone;
  webcamResolution: WebcamResolution;
};

function CreateDesktopComputer({
  accessoryColor,
  accessoryFieldsAdditionalMap,
  accessoryInterface,
  accessoryType,
  borderColor,
  caseColor,
  caseFieldsAdditionalMap,
  caseSidePanel,
  caseType,
  cpuCores,
  cpuFieldsAdditionalMap,
  cpuFrequency,
  cpuL1CacheCapacity,
  cpuL1CacheCapacityUnit,
  cpuL2CacheCapacity,
  cpuL2CacheCapacityUnit,
  cpuL3CacheCapacity,
  cpuL3CacheCapacityUnit,
  cpuSocket,
  cpuWattage,
  createProductAction,
  createProductDispatch,
  displayAspectRatio,
  displayFieldsAdditionalMap,
  displayPanelType,
  displayRefreshRate,
  displayResolutionHorizontal,
  displayResolutionVertical,
  displayResponseTime,
  displaySize,
  gpuBoostClock,
  gpuChipset,
  gpuCoreClock,
  gpuFieldsAdditionalMap,
  gpuMemoryCapacity,
  gpuMemoryCapacityUnit,
  gpuTdp,
  headphoneColor,
  headphoneDriver,
  headphoneFieldsAdditionalMap,
  headphoneFrequencyResponse,
  headphoneImpedance,
  headphoneInterface,
  headphoneType,
  keyboardBacklight,
  keyboardFieldsAdditionalMap,
  keyboardInterface,
  keyboardLayout,
  keyboardSwitch,
  microphoneColor,
  microphoneFieldsAdditionalMap,
  microphoneFrequencyResponse,
  microphoneInterface,
  microphonePolarPattern,
  microphoneType,
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
  mouseButtons,
  mouseColor,
  mouseDpi,
  mouseFieldsAdditionalMap,
  mouseInterface,
  mouseSensor,
  padding,
  psuEfficiency,
  psuFieldsAdditionalMap,
  psuFormFactor,
  psuModularity,
  psuWattage,
  ramColor,
  ramDataRate,
  ramFieldsAdditionalMap,
  ramModulesCapacity,
  ramModulesCapacityUnit,
  ramModulesQuantity,
  ramTiming,
  ramType,
  ramVoltage,
  speakerColor,
  speakerFieldsAdditionalMap,
  speakerFrequencyResponse,
  speakerInterface,
  speakerTotalWattage,
  speakerType,
  storageCacheCapacity,
  storageCacheCapacityUnit,
  storageCapacity,
  storageCapacityUnit,
  storageFieldsAdditionalMap,
  storageFormFactor,
  storageInterface,
  storageType,
  webcamColor,
  webcamFieldsAdditionalMap,
  webcamFrameRate,
  webcamInterface,
  webcamMicrophone,
  webcamResolution,
}: CreateDesktopComputerProps) {}

export default CreateDesktopComputer;

/**
 * const displayCaseSpecificationsInputs = (
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

 */
