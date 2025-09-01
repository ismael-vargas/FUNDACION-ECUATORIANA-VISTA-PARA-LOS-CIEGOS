import { useState } from "react";
import { Roles } from "../common/roles";
import { ProtectedComponent } from "../auth/ProtectedComponent";
import { NewBudget } from "../components/approvals/NewBudget";
import { Budgets } from "../components/approvals/Budgets";

export const Approvals = () => {
    const [active, setActive] = useState(false);

    return (

        <div className="flex flex-col justify-center mt-0 gap-2 text-center">
            <div className="flex gap-4 p-4">
                <button onClick={() => setActive(false)} className={`p-2 rounded-md ${!active ? 'bg-indigo-950' : 'bg-slate-600'} hover:bg-indigo-950 text-white hover:scale-105 transition-all duration-300`}>
                    Presupuestos
                </button>
                <button onClick={() => setActive(true)} className={`p-2 rounded-md ${active ? ' bg-indigo-950 ' : 'bg-slate-600'} hover:bg-indigo-950 text-white hover:scale-105 transition-all duration-300`}>
                    Nuevo presupuesto
                </button>
            </div>
            {active ? (
                <ProtectedComponent requiredRole={Roles.ADMIN}>
                    <NewBudget />
                </ProtectedComponent>
            ) : (
                <ProtectedComponent requiredRole={Roles.APPROVING}>
                    <Budgets />
                </ProtectedComponent>
            )}
        </div>

    )
}

  //hola mundo