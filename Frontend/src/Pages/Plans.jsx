import React from 'react'
import PlanCard from '../Components/PlanCard'

function Plans() {
  return (
    <>
    <section className="min-h-screen w-full py-12">
      <section className='flex items-center flex-col w-full'>
        <h1 className='font-bold'>Contrata un plan</h1>
        <p className='mx-4 text-center'>Elige el plan que más se adapte a tus necesidades y clientes como 
          <span className='text-blue-500'> terapeúta</span></p>
      </section>
      <div className="flex items-center justify-center my-10">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg justify-between bg-basic">
            <PlanCard
              title="Básico"
              price="3$"
              features={[
                "10 citas a la semana",
                "10 citas sin comisión",
              ]}
              colorBg="bg-epic"
            />
          </div>
          <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg justify-between bg-medium">
    
            <PlanCard 
              title="Medio"
              price="10$"
              features={[
                "50 citas a la semana",
                "30 citas sin comisión",
              ]}
              colorBg="bg-medium"
            />
          </div>
          <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg justify-between bg-epic">
            <PlanCard
              title="Épico"
              price="25$"
              features={[
                "Citas ilimitadas a la semana",
                "Libre de comisión",
              ]}
              colorBg="bg-epic"
            />
          </div>
        </div>
      </div>
      </div>
    </section>
    </>

  )
}

export default Plans