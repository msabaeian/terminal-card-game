import { Room } from "@utils/types";
import { generateUUID } from "@utils/string.utils";

const ROOMS_MOCK: Room[] = [
    {
        id: generateUUID(),
        name: "Mashti hasti",
        owner_id: generateUUID(),
        team_a: [{ id: generateUUID(), username: "hossi" }, undefined],
        team_b: [undefined, undefined],
    },
    {
        id: generateUUID(),
        name: "farzanegan",
        owner_id: generateUUID(),
        team_a: [
            { id: generateUUID(), username: "javadyasari" },
            { id: generateUUID(), username: "mojibajim" },
        ],
        team_b: [undefined, undefined],
    },
    {
        id: generateUUID(),
        name: "ansariDezzz",
        owner_id: generateUUID(),
        team_a: [
            { id: generateUUID(), username: "khaled" },
            { id: generateUUID(), username: "hellhound" },
        ],
        team_b: [undefined, undefined],
    },
    {
        id: generateUUID(),
        name: "bachoon sahra bedar",
        owner_id: generateUUID(),
        team_a: [
            { id: generateUUID(), username: "khaled" },
            { id: generateUUID(), username: "hellhound" },
        ],
        team_b: [{ id: generateUUID(), username: "koleini" }, undefined],
    },
];

export { ROOMS_MOCK };
