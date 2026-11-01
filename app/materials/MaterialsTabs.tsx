"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Tabs from "@/components/ui/Tabs";
import type { Level } from "@/lib/types";

export default function MaterialsTabs({ levels }: { levels: Level[] }) {
  const [active, setActive] = useState(levels[0].id);
  const level = levels.find((l) => l.id === active) ?? levels[0];

  return (
    <Container className="py-10">
      <Tabs label="Select level" tabs={levels.map((l) => ({ id: l.id, label: l.label }))} active={active} onChange={setActive} />
      <div role="tabpanel" id={`panel-${level.id}`} aria-labelledby={`tab-${level.id}`}>
        <Card className="mt-8 p-6 sm:p-10">
          <h2 className="font-display text-2xl font-bold text-brand-900">{level.label} Materials</h2>
          <p className="mt-2 max-w-xl text-slate-600">{level.blurb}</p>
          <ButtonLink href={level.driveUrl} target="_blank" rel="noopener noreferrer" className="mt-6">
            Open full folder ↗
          </ButtonLink>
        </Card>
      </div>
    </Container>
  );
}
