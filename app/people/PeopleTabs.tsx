"use client";

import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import Container from "@/components/ui/Container";
import Tabs from "@/components/ui/Tabs";
import type { PeopleGroup } from "@/lib/types";

export default function PeopleTabs({ groups }: { groups: PeopleGroup[] }) {
  const [active, setActive] = useState(groups[0].id);
  const group = groups.find((g) => g.id === active) ?? groups[0];

  return (
    <Container className="py-10">
      <Tabs label="Select group" tabs={groups.map((g) => ({ id: g.id, label: g.label }))} active={active} onChange={setActive} />
      <div role="tabpanel" id={`panel-${group.id}`} aria-labelledby={`tab-${group.id}`}>
        <p className="mt-6 text-slate-600">{group.blurb}</p>

        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {group.members.map((p, i) => (
            // Every card is exactly h-64 and every part inside has a fixed height,
            // so cards stay the same size whatever you add or leave out.
            <li key={`${p.role}-${i}`} className="flex h-64 flex-col items-center rounded-2xl border border-brand-100 bg-white p-4 text-center">
              <Avatar name={p.name} photo={p.photo} seed={`${p.name}-${p.role}-${i}`} />
              <h3 title={p.name} className="mt-3 line-clamp-2 h-12 w-full font-display text-base font-semibold leading-6 text-brand-900">
                {p.name}
              </h3>
              <p title={p.role} className="line-clamp-2 h-10 w-full text-sm leading-5 text-brand-500">
                {p.role}
              </p>
              <p className="mt-auto h-5 text-sm leading-5">
                {p.phone && (
                  <a href={`tel:+${p.phone}`} className="text-slate-600 underline">
                    +{p.phone}
                  </a>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
