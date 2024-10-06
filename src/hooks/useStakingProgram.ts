import { Program } from '@coral-xyz/anchor';
import { useAnchorProvider } from './useAnchorProvider';

import { StepStakingJSON, StepStakingIDL } from '@/constants/idl';
import { X_STEP_PROGRAM_ID } from '@/constants/programPubkey';

export const useStakingProgram = () => {
  const provider = useAnchorProvider();

  const program = new Program(
    StepStakingJSON,
    X_STEP_PROGRAM_ID,
    provider
  ) as Program<StepStakingIDL>;

  return program;
};
