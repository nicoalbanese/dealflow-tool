// import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/router";
import { type FormEvent, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export default function UniversalSearch({
  initialSearchQuery = "",
  disabled = false,
  queryAirtable = (companyName: string) => {
    console.log("default function", companyName);
  },
}) {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement | null>(null);
  useHotkeys("meta+k", () => {
    inputRef.current?.focus();
  });

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?companyName=${searchQuery}`);
    if (router.route == "/search") {
      queryAirtable(searchQuery);
    }
  };

  return (
    <div className="max-w-1/4">
      <form className="relative mt-1 flex items-center" onSubmit={handleSearch}>
        <input
          disabled={disabled}
          type="text"
          name="search"
          id="search"
          value={searchQuery}
          ref={inputRef}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="company search"
          className="block w-full rounded-lg border-gray-300 pr-12 text-slate-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400">
            ⌘K
          </kbd>
        </div>
      </form>
    </div>
  );
}
