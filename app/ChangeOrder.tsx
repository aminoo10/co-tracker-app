export interface ChangeOrder { 

        malcode: string;
        environment: "PROD" | "PAT";
        risk : "Low" | "Moderate" | "High" | "Very High";
        description: string;
        mesProvided: true | false;
        start: Date;
        end: Date;
        chg: string;
        notes: string;
      
}