import { ArchitectureFacade } from "../../1facade"
import { ArchitectureBL } from "../../2business"



export class Injection {
    public static InjectionArchitectureFacade() { return new ArchitectureFacade() };
    public static InjectionArchitectureBusiness() { return new ArchitectureBL() };
}


