const Button = (props: any) => {
  return (
    <div className="relative">
      <button className="relative z-10 px-6 py-1 border-2 border-[#D8A262] bg-[#D2B48C] hover:text-[#AB6B2E] transition-all rounded-full" style={{ borderColor: "#F5DEB3" }}>
        {props.title}
      </button>
      <div className="absolute inset-0" style={{ backgroundColor: "#AB6B2E", opacity: "0.3", borderRadius: "9999px" }}></div>
    </div>
  );
};

export default Button;
