export interface ChangeOrder { 

        malcode: string;
        environment: "PROD" | "PAT";
        risk : "Low" | "Moderate" | "High" | "Very High";
        description: string;
        mesProvided: boolean;
        start: Date;
        end: Date;
        chg: string;
        status: string;
        notes: string;
}

/*
 thinking about this, I was going to add a unique ID identifier, but I realized that the
 CHG property is unique for each entry, so that can be used!

 We have to also make sure that there are no duplicates, and if there are, have some sort of
 functionality that detects if that change has been created.
*/