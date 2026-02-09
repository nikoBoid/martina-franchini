export default function Hero() {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-black">
        {/* Background image */}
        <img
          src="/Hero.jpeg"
          alt="Industrial fog cranes"
          className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale"
        />
  
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
  
        {/* Content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="max-w-4xl px-8">
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight text-white">
              Martina Franchini
              <br />
            </h1>
  
            <p className="mt-6 max-w-xl text-lg text-gray-300">

            </p>
  
          </div>
        </div>
      </section>
    );
  }
  