import { AccessGate } from "../access-gate";

import { ManuscriptLayout } from "./manuscript-layout";

export default function ManuscritoPage() {
  return (
    <AccessGate>
      <ManuscriptLayout />
    </AccessGate>
  );
}
