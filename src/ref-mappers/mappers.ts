import {RefMapper, RefMapperBase,} from './ref-mapper';
import {FtlEvent} from '../models/ftl-event';
import {Node} from 'vscode-html-languageservice';
import {Position, TextDocument} from 'vscode';
import {events} from '../events';
import {getAttrValueForTag, getNodeTextContent} from '../helpers';
import {
    AugmentNames,
    AutoblueprintNames,
    CrewNames,
    DroneNames,
    EventNamesValueSet,
    ShipNames,
    SystemNames,
    TextIdNames,
    WeaponNames
} from '../data/autocomplete-value-sets';
import {defaultEvents} from '../data/default-events';
import {FtlShip} from '../models/ftl-ship';
import {defaultShips} from '../data/default-ships';
import {FtlWeapon} from '../models/ftl-weapon';
import {FtlAutoblueprint} from '../models/ftl-autoblueprint';
import {defaultAutoBlueprints} from '../data/default-auto-blueprints';
import {FtlText} from '../models/ftl-text';
import {BlueprintMapper} from './blueprint-mapper';
import {DocumentCache} from '../document-cache';
import {defaultWeaponBlueprints} from '../data/default-weapon-blueprints';
import {FtlDrone} from '../models/ftl-drone';
import {defaultDrones} from '../data/default-drones';
import {FtlAugment} from '../models/ftlAugment';
import {defaultAugments} from '../data/default-augments';
import {FtlCrew} from '../models/ftl-crew';
import {defaultCrew} from '../data/default-crew';
import {FtlSystem} from '../models/ftl-system';
import {defaultSystems} from '../data/default-systems';
import {defaultText} from '../data/default-text';

export namespace mappers {

    export const eventsMapper = new RefMapper(file => file.events,
        file => file.eventRefs,
        (name, file, node, document) => new FtlEvent(name, file, node, document),
        {
            getNameDef(node: Node, document: TextDocument, position?: Position): string | undefined {
                return events.getEventNameDef(node, document, position);
            },
            getRefName(node: Node, document: TextDocument, position?: Position): string | undefined {
                return events.getEventRefName(node, document, position)
                    ?? getAttrValueForTag(node,
                        'destroyed',
                        'load',
                        document,
                        position)
                    ?? getAttrValueForTag(node,
                        'deadCrew',
                        'load',
                        document,
                        position)
                    ?? getAttrValueForTag(node,
                        'surrender',
                        'load',
                        document,
                        position);
            }
        },
        EventNamesValueSet,
        "Event",
        defaultEvents);

    export const shipsMapper = new RefMapper(file => file.ships,
        file => file.shipRefs,
        (name, file, node, document) => new FtlShip(name, file, node, document),
        {
            getNameDef(node: Node, document: TextDocument, position?: Position): string | undefined {
                return getAttrValueForTag(node,
                    'ship',
                    'name',
                    document,
                    position);
            },
            getRefName(node: Node, document: TextDocument, position?: Position): string | undefined {
                return getAttrValueForTag(node,
                    'ship',
                    'load',
                    document,
                    position);
            }
        },
        ShipNames,
        "Ship",
        defaultShips);

    export const weaponsMapper = new RefMapper(file => file.weapons,
        file => file.weaponRefs,
        (name, file, node, document) => new FtlWeapon(name,
            file,
            node,
            document),
        {
            getNameDef(node: Node, document: TextDocument, position?: Position): string | undefined {
                return getAttrValueForTag(node,
                    'weaponBlueprint',
                    'name',
                    document,
                    position);
            },
            getRefName(node: Node, document: TextDocument, position?: Position): string | undefined {

                let name = getAttrValueForTag(node,
                    'weapon',
                    'name',
                    document,
                    position);
                if (name) return name;
                if (node.tag == "weaponBlueprint" && node.parent?.tag == "droneBlueprint" && !node.attributes)
                    return getNodeTextContent(node, document)
            }
        },
        WeaponNames,
        "Weapon",
        defaultWeaponBlueprints);

    export const dronesMapper = new RefMapper(file => file.drones,
        file => file.droneRefs,
        (name, file, node, document) => new FtlDrone(name, file, node, document),
        {
            getNameDef(node: Node, document: TextDocument, position?: Position): string | undefined {
                return getAttrValueForTag(node,
                    'droneBlueprint',
                    'name',
                    document,
                    position);
            },
            getRefName(node: Node, document: TextDocument, position?: Position): string | undefined {
                return getAttrValueForTag(node,
                    'drone',
                    'name',
                    document,
                    position)
            }
        },
        DroneNames,
        "Drone",
        defaultDrones);

    export const augmentsMapper = new RefMapper(file => file.augments,
        file => file.augmentRefs,
        (name, file, node, document) => new FtlAugment(name,
            file,
            node,
            document),
        {
            getNameDef(node: Node, document: TextDocument, position?: Position): string | undefined {
                return getAttrValueForTag(node,
                    'augBlueprint',
                    'name',
                    document,
                    position);
            },
            getRefName(node: Node, document: TextDocument, position?: Position): string | undefined {
                return getAttrValueForTag(node,
                        'augment',
                        'name',
                        document,
                        position)
                    ?? getAttrValueForTag(node,
                        'aug',
                        'name',
                        document,
                        position)
            }
        },
        AugmentNames,
        "Augment",
        defaultAugments);

    export const crewMapper = new RefMapper(file => file.crew,
        file => file.crewRefs,
        (name, file, node, document) => new FtlCrew(name, file, node, document),
        {
            getNameDef(node: Node, document: TextDocument, position?: Position): string | undefined {
                return getAttrValueForTag(node,
                    'crewBlueprint',
                    'name',
                    document,
                    position);
            },
            getRefName(node: Node, document: TextDocument, position?: Position): string | undefined {
                return getAttrValueForTag(node,
                        'crewMember',
                        'class',
                        document,
                        position)
                    ?? getAttrValueForTag(node,
                        'crewMember',
                        'type',
                        document,
                        position)
                    ?? getAttrValueForTag(node,
                        'removeCrew',
                        'class',
                        document,
                        position)
            }
        },
        CrewNames,
        "Crew",
        defaultCrew);

    export const systemMapper = new RefMapper(file => file.systems,
        file => file.systemRefs,
        (name, file, node, document) => new FtlSystem(name, file, node, document),
        {
            getNameDef(node: Node, document: TextDocument, position?: Position): string | undefined {
                return getAttrValueForTag(node,
                    'systemBlueprint',
                    'name',
                    document,
                    position);
            },
            getRefName(node: Node, document: TextDocument, position?: Position): string | undefined {
                return getAttrValueForTag(node,
                    'status',
                    'system',
                    document,
                    position)
            }
        },
        SystemNames,
        "System",
        defaultSystems);

    export const autoBlueprintMapper = new RefMapper(file => file.autoBlueprints,
        file => file.autoBlueprintRefs,
        (name, file, node, document) => new FtlAutoblueprint(name,
            file,
            node,
            document),
        {
            getNameDef(node: Node, document: TextDocument, position?: Position): string | undefined {
                return getAttrValueForTag(node,
                    'shipBlueprint',
                    'name',
                    document,
                    position);
            },
            getRefName(node: Node, document: TextDocument, position?: Position): string | undefined {
                return getAttrValueForTag(node,
                    'ship',
                    'auto_blueprint',
                    document,
                    position);
            }
        },
        AutoblueprintNames,
        "Auto Blueprint",
        defaultAutoBlueprints);

    export const textMapper = new RefMapper(file => file.texts,
        file => file.textRefs,
        (name, file, node, document) => new FtlText(name, file, node, document), {
            getNameDef(node: Node, document: TextDocument, position?: Position): string | undefined {
                return getAttrValueForTag(node, 'text', 'name', document, position)
                    ?? getAttrValueForTag(node,
                        'textList',
                        'name',
                        document,
                        position);
            },
            getRefName(node: Node, document: TextDocument, position?: Position): string | undefined {
                return getAttrValueForTag(node, 'text', 'load', document, position)
                    ?? getAttrValueForTag(node, 'text', 'id', document, position)
                    ?? getAttrValueForTag(node, 'title', 'id', document, position)
                    ?? getAttrValueForTag(node, 'short', 'id', document, position)
                    ?? getAttrValueForTag(node, 'desc', 'id', document, position)
                    ?? getAttrValueForTag(node, 'tooltip', 'id', document, position)
                    ?? getNodeTextContent(node, document, 'tip');
            }
        }, TextIdNames, "Text", defaultText);

    const blueprintMappers: RefMapperBase[] = [
        weaponsMapper,
        autoBlueprintMapper,
        dronesMapper,
        augmentsMapper,
        crewMapper,
        systemMapper
    ];

    export function setup(documentCache: DocumentCache) {
        const blueprintMapper = new BlueprintMapper(blueprintMappers);
        const mappers: RefMapperBase[] = [
            eventsMapper,
            shipsMapper,
            textMapper,
            blueprintMapper
        ];
        return {blueprintMapper, mappers};
    }

}
