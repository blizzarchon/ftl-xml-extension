import {FtlEvent} from './ftl-event';
import {Uri} from 'vscode';
import {FtlShip} from './ftl-ship';
import {FtlAutoblueprint} from './ftl-autoblueprint';
import {FtlText} from './ftl-text';
import {FtlWeapon} from './ftl-weapon';
import {FtlBlueprintList} from './ftl-blueprint-list';
import {FtlDrone} from './ftl-drone';
import {FtlValue} from './ftl-value';
import {FtlAugment} from './ftlAugment';
import {FtlCrew} from './ftl-crew';
import {FtlSystem} from './ftl-system';

export class FtlFile {

    constructor(public uri: Uri) {
    }

    events: FtlEvent[] = [];
    eventRefs = new Map<string, FtlEvent[]>();

    ships: FtlShip[] = [];
    shipRefs = new Map<string, FtlShip[]>();

    autoBlueprints: FtlAutoblueprint[] = [];
    autoBlueprintRefs = new Map<string, FtlAutoblueprint[]>();

    texts: FtlText[] = [];
    textRefs = new Map<string, FtlText[]>();

    weapons: FtlWeapon[] = [];
    weaponRefs = new Map<string, FtlWeapon[]>();

    drones: FtlDrone[] = [];
    droneRefs = new Map<string, FtlDrone[]>();
    augments: FtlAugment[] = [];
    augmentRefs = new Map<string, FtlAugment[]>();
    crew: FtlCrew[] = [];
    crewRefs = new Map<string, FtlCrew[]>();
    systems: FtlSystem[] = [];
    systemRefs = new Map<string, FtlSystem[]>();

    blueprintLists: FtlBlueprintList[] = [];
    blueprintListRefs = new Map<string, FtlValue[]>();
}
