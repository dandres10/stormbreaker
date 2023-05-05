
import { ArchitectureFacade } from "../../1facade/ArchitectureFacade"
import { ArchitectureBL } from "../../2business/ArchitectureBL"
import { DataBL } from "../../2business/data/DataBL"
import { AccessCommon } from "../class/access-common"
import { File } from "../class/file"



export class Injection {
    public static InjectionArchitectureFacade() { return new ArchitectureFacade() };
    public static InjectionArchitectureBusiness() { return new ArchitectureBL() };
    public static InjectionFile() { return new File() };
    public static InjectionAccessCommon() { return new AccessCommon() };
    public static InjectionDataBL() { return new DataBL() };
}


