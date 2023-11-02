import React from "react";
import { Link } from "react-router-dom";

function PlanCard({ title, price, features, colorBg }) {
  return (
    <>
      <div>
        <h3 className="text-2xl font-bold text-center">{title}</h3>
        <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
          <span className="text-4xl font-bold">{price}</span>/ mes
        </div>
        {   
            features.map((feature, index) => (
                <div className="mt-6" key={index}>
                    <span className="text-zinc-600 dark:text-dark-400">{feature}</span>
                </div>
            ))
        }
        { // Aquí se puede agregar lógica para veriifcar si hay jwt y mandarlo 
            // a la página de login o a la de contratación
        }
        <Link to={"/login"}>
        <div className="mt-6 flex justify-center">
            <button className="border-2 border-zinc-200 text-gray-500 hover:text-yellow-900 py-2 px-4 rounded w-2/3">
                Contratar el Plan
            </button>
        </div>
        </Link>
      </div>
    </>
  );
}

export default PlanCard;
