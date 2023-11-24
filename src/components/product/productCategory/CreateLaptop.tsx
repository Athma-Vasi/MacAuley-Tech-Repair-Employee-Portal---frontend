import { MantineNumberSize, Stack, Title } from '@mantine/core';

import {
  CaseSidePanel,
  CaseType,
  CreateProductAction,
  CreateProductDispatch,
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
} from '../types';
import CreateCase from './CreateCase';
import CreateCpu from './CreateCpu';
import CreateDisplay from './CreateDisplay';
import CreateGpu from './CreateGpu';
import CreateKeyboard from './CreateKeyboard';
import CreateMotherboard from './CreateMotherboard';
import CreateMouse from './CreateMouse';
import CreatePsu from './CreatePsu';
import CreateRam from './CreateRam';
import CreateSpeaker from './CreateSpeaker';
import CreateStorage from './CreateStorage';

type CreateLaptopProps = {
  // ╭─────────────────────────────────────────────────────────────────╮
  //    CPU INPUTS
  // ╰─────────────────────────────────────────────────────────────────╯
  areCpuFieldsAdditionalMapFocused: Map<number, [boolean, boolean]>;
  areCpuFieldsAdditionalMapValid: Map<number, [boolean, boolean]>;
  borderColor: string;
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
  currentlySelectedAdditionalFieldIndex: number;
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
  padding: MantineNumberSize;

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
};

function CreateLaptop({
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
}: CreateLaptopProps) {
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  //  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  //    INPUT DISPLAY
  //  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  // ╔═════════════════════════════════════════════════════════════════╗
  //   DISPLAY CPU SPECIFICATIONS INPUTS
  // ╚═════════════════════════════════════════════════════════════════╝
  const displayCpuSpecificationsInputs = (
    <CreateCpu
      areCpuFieldsAdditionalMapFocused={areCpuFieldsAdditionalMapFocused}
      areCpuFieldsAdditionalMapValid={areCpuFieldsAdditionalMapValid}
      borderColor={borderColor}
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
      currentlySelectedAdditionalFieldIndex={
        currentlySelectedAdditionalFieldIndex
      }
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
      areDisplayFieldsAdditionalMapFocused={
        areDisplayFieldsAdditionalMapFocused
      }
      areDisplayFieldsAdditionalMapValid={areDisplayFieldsAdditionalMapValid}
      borderColor={borderColor}
      createProductAction={createProductAction}
      createProductDispatch={createProductDispatch}
      currentlySelectedAdditionalFieldIndex={
        currentlySelectedAdditionalFieldIndex
      }
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
      isDisplayResolutionHorizontalFocused={
        isDisplayResolutionHorizontalFocused
      }
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
      borderColor={borderColor}
      createProductAction={createProductAction}
      createProductDispatch={createProductDispatch}
      currentlySelectedAdditionalFieldIndex={
        currentlySelectedAdditionalFieldIndex
      }
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
  //   DISPLAY RAM SPECIFICATIONS INPUTS
  // ╚═════════════════════════════════════════════════════════════════╝
  const displayRamSpecificationsInputs = (
    <CreateRam
      areRamFieldsAdditionalMapFocused={areRamFieldsAdditionalMapFocused}
      areRamFieldsAdditionalMapValid={areRamFieldsAdditionalMapValid}
      borderColor={borderColor}
      createProductAction={createProductAction}
      createProductDispatch={createProductDispatch}
      currentlySelectedAdditionalFieldIndex={
        currentlySelectedAdditionalFieldIndex
      }
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
  //   DISPLAY STORAGE SPECIFICATIONS INPUTS
  // ╚═════════════════════════════════════════════════════════════════╝
  const displayStorageSpecificationsInputs = (
    <CreateStorage
      areStorageFieldsAdditionalMapFocused={
        areStorageFieldsAdditionalMapFocused
      }
      areStorageFieldsAdditionalMapValid={areStorageFieldsAdditionalMapValid}
      borderColor={borderColor}
      createProductAction={createProductAction}
      createProductDispatch={createProductDispatch}
      currentlySelectedAdditionalFieldIndex={
        currentlySelectedAdditionalFieldIndex
      }
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

  const displayLaptopSpecificationsInputs = (
    <Stack w="100%">
      <Title order={3}>Laptop Specifications</Title>
      {displayCpuSpecificationsInputs}
      {displayDisplaySpecificationsInputs}
      {displayGpuSpecificationsInputs}
      {displayRamSpecificationsInputs}
      {displayStorageSpecificationsInputs}
    </Stack>
  );

  return displayLaptopSpecificationsInputs;
}

export default CreateLaptop;
