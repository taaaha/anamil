"use client";

import * as React from "react";

const inputCls =
  "h-11 rounded-lg border border-ink-200 bg-white px-3 text-ink-900 focus:outline-none focus:ring-2 focus:ring-clay-400 focus:border-clay-400 w-full";

export function Text({
  name,
  label,
  defaultValue,
  required,
  placeholder,
  dir,
  type = "text",
}: {
  name: string;
  label: string;
  defaultValue?: string | number | null;
  required?: boolean;
  placeholder?: string;
  dir?: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink-700">
        {label}
        {required && <span className="text-rose-deep"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue ?? undefined}
        dir={dir}
        className={inputCls}
      />
    </label>
  );
}

export function Area({
  name,
  label,
  defaultValue,
  rows = 3,
  dir,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  rows?: number;
  dir?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink-700">{label}</span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? undefined}
        dir={dir}
        className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-ink-900 focus:outline-none focus:ring-2 focus:ring-clay-400 focus:border-clay-400 resize-y w-full"
      />
    </label>
  );
}

export function Select({
  name,
  label,
  options,
  defaultValue,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink-700">{label}</span>
      <select name={name} defaultValue={defaultValue} className={inputCls}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Toggle({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="inline-flex items-center gap-2.5 cursor-pointer">
      <input
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="size-5 rounded border-ink-300 text-clay-600 focus:ring-clay-400 accent-clay-600"
      />
      <span className="text-sm font-medium text-ink-700">{label}</span>
    </label>
  );
}

/** Three-column multilingual input group (ar / fr / en). */
export function LocalizedGroup({
  base,
  label,
  values,
  area,
}: {
  base: string;
  label: string;
  values?: { ar?: string | null; fr?: string | null; en?: string | null } | null;
  area?: boolean;
}) {
  const F = area ? Area : Text;
  return (
    <fieldset className="border border-ink-100 rounded-xl p-4">
      <legend className="text-sm font-semibold text-ink-900 px-2">{label}</legend>
      <div className="grid sm:grid-cols-3 gap-3 mt-1">
        <F name={`${base}_ar`} label="العربية" defaultValue={values?.ar ?? ""} dir="rtl" />
        <F name={`${base}_fr`} label="Français" defaultValue={values?.fr ?? ""} dir="ltr" />
        <F name={`${base}_en`} label="English" defaultValue={values?.en ?? ""} dir="ltr" />
      </div>
    </fieldset>
  );
}
