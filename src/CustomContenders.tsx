import { useEffect, useState } from "react";

const STORAGE_KEY = "contenders";

export function loadContenders(): { [name: string]: string } {
  const storedContenders = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "{}"
  );
  if (typeof storedContenders !== "object") {
    console.error("Invalid stored contenders. Resetting.");
    return {};
  }
  if (
    Object.entries(storedContenders).some(([name, callbackCode]) => {
      return typeof name !== "string" || typeof callbackCode !== "string";
    })
  ) {
    console.error("Invalid stored contender. Resetting.");
    return {};
  }
  return storedContenders;
}

function saveContenders(contenders: { [name: string]: string }) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contenders));
}

function CustomContender({
  name,
  code,
  onSave,
  onDelete,
}: {
  name: string;
  code: string;
  onSave: (name: string, code: string) => void;
  onDelete: () => void;
}) {
  console.log("CustomContender", name, code);
  const [nameVal, setNameVal] = useState(name);
  const [codeVal, setCodeVal] = useState(code);
  console.log("CustomContender Vals", nameVal, codeVal);
  return (
    <>
      <input
        placeholder="Name"
        value={nameVal}
        onChange={(e) => {
          setNameVal(e.target.value);
        }}
      />
      <textarea
        placeholder="Code"
        value={codeVal}
        onChange={(e) => {
          setCodeVal(e.target.value);
        }}
      />
      <button
        onClick={() => {
          onSave(nameVal, codeVal);
        }}
      >
        Save
      </button>
      <button onClick={onDelete}>Delete</button>
    </>
  );
}

export function CustomContenders() {
  const [contenders, setContenders] = useState(loadContenders());
  console.log("Contenders", contenders);
  useEffect(() => {
    saveContenders(contenders);
  }, [contenders]);

  const [selectedContender, setSelectedContender] = useState<
    string | undefined
  >(undefined);
  const contenderNames = Object.keys(contenders);
  contenderNames.sort();

  console.log("Selected contender", selectedContender);

  return (
    <>
      <h1>Contenders</h1>
      <select
        value={selectedContender}
        onChange={(e) => setSelectedContender(e.target.value)}
      >
        <option
          value={"My new contender"}
          onSelect={() => setSelectedContender(undefined)}
        >
          New...
        </option>
        {contenderNames.map((contender) => (
          <option
            key={contender}
            value={contender}
            onSelect={() => setSelectedContender(contender)}
          >
            {contender}
          </option>
        ))}
      </select>
      <CustomContender
        key={selectedContender}
        name={selectedContender || ""}
        code={contenders[selectedContender || ""] || ""}
        onSave={(name, code) => {
          console.log("Saving", name, code);
          const newContenders = { ...contenders };
          newContenders[name] = code;
          setContenders(newContenders);
          setSelectedContender(name);
        }}
        onDelete={() => {
          console.log("Deleting", selectedContender);
          if (!selectedContender) {
            return;
          }
          const newContenders = { ...contenders };
          delete newContenders[selectedContender];
          setContenders(newContenders);
          setSelectedContender(undefined);
        }}
      />
    </>
  );
}
