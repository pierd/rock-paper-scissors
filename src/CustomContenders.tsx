import { useRef, useState } from "react";

const STORAGE_KEY = "contenders";

function loadContenders(): { [name: string]: string } {
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
  const [nameVal, setNameVal] = useState(name);
  const [codeVal, setCodeVal] = useState(code);
  return (
    <>
      <input
        placeholder="Name"
        value={nameVal}
        onChange={(event) => {
          setNameVal(event.target.value);
        }}
      />
      <textarea
        placeholder="Code"
        value={codeVal}
        onChange={(event) => {
          setCodeVal(event.target.value);
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
  const storedContenders = loadContenders();
  const [selectedContender, setSelectedContender] = useState<
    string | undefined
  >(undefined);
  const contender =
    selectedContender === undefined
      ? { name: "", code: "" }
      : {
          name: selectedContender,
          code: storedContenders[selectedContender],
        };
  const contenderNames = Object.keys(storedContenders);
  contenderNames.sort();
  return (
    <>
      <h1>Contenders</h1>
      <select value={selectedContender}>
        <option
          value={undefined}
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
        name={contender.name}
        code={contender.code}
        onSave={(name, code) => {
          console.log("Saving", name, code);
          storedContenders[name] = code;
          saveContenders(storedContenders);
          setSelectedContender(name);
        }}
        onDelete={() => {
            console.log("Deleting", contender.name);
          delete storedContenders[contender.name];
          saveContenders(storedContenders);
          setSelectedContender(undefined);
        }}
      />
    </>
  );
}
