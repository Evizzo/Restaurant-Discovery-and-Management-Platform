const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 bg-gradient-to-r from-[#D1A373] to-[#8B5A2B]">
      <h1 className="font-semibold text-center text-4xl lg:mt-14 mt-24 mb-8">O nama</h1>
      <div className="flex flex-col lg:flex-row items-center gap-5">
        <div className="w-full lg:w-2/4">
          <img className="rounded-lg w-1/2 h-auto mx-auto lg:ml-44" src={"/assets/logo.jpeg"} alt="img" />
        </div>
        <div className="w-full lg:w-2/4 p-4 space-y-3">
          <h2 className="font-semibold text-3xl">
            Lorem ipsum text ?
          </h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi
            quaerat quia quasi beatae et iste, tempora voluptatum corporis sit
            pariatur eaque exercitationem, doloribus eum optio nobis cum?
            Quidem, dolor atque.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ut
            minima perspiciatis doloribus quod repellendus molestiae rerum!
            Enim, vero natus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
