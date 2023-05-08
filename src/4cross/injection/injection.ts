
import { ArchitectureFacade } from "../../1facade/ArchitectureFacade"
import { ArchitectureBL } from "../../2business/ArchitectureBL"
import { DataBL } from "../../2business/data/DataBL"
import { DataExampleBL } from "../../2business/data_example/DataBL"
import { DomainBL } from "../../2business/domain/DomainBL"
import { FacadeBL } from "../../2business/facade/FacadeBL"
import { InfraestructureBL } from "../../2business/infraestructure/InfraestructureBL"
import { AccessCommon } from "../class/access-common"
import { File } from "../class/file"



export class Injection {
    public static InjectionArchitectureFacade() { return new ArchitectureFacade() };
    public static InjectionArchitectureBusiness() { return new ArchitectureBL() };
    public static InjectionFile() { return new File() };
    public static InjectionAccessCommon() { return new AccessCommon() };
    public static InjectionDataExampleBL() { return new DataExampleBL() };

    public static InjectionDataBL() { return new DataBL() };
    public static InjectionDomainBL() { return new DomainBL() };
    public static InjectionFacadeBL() { return new FacadeBL() };
    public static InjectionInfraestructureBL() { return new InfraestructureBL() };
}


