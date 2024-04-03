import {Room} from "@utils/types";
import { v4 as uuidv4 } from "uuid";

const ROOMS_MOCK: Room[] = [
    {
        id: uuidv4(),
        name: "Mashti hasti",
        team_a: [{id: uuidv4(), username: "hossi"}, undefined],
        team_b: [undefined, undefined]
    },
    {
        id: uuidv4(),
        name: "farzanegan",
        team_a: [{id: uuidv4(), username: "javadyasari"}, {id: uuidv4(), username: "mojibajim"}],
        team_b: [undefined, undefined]
    },
    {
        id: uuidv4(),
        name: "ansariDezzz",
        team_a: [{id: uuidv4(), username: "khaled"}, {id: uuidv4(), username: "hellhound"}],
        team_b: [undefined, undefined]
    },
    {
        id: uuidv4(),
        name: "bachoon sahra bedar",
        team_a: [{id: uuidv4(), username: "khaled"}, {id: uuidv4(), username: "hellhound"}],
        team_b: [{id: uuidv4(), username: "koleini"}, undefined]
    }
]

export {
    ROOMS_MOCK
}
