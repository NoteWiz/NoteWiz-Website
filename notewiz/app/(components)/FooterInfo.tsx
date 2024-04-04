export const FooterInfo = (props: { info: string; info2: string }) => {
  return (
    <div className="flex flex-col pb-8 max-w-[20vw]">
      <p className="text-3xl text-white font-semibold flex ">Quick Links</p>
      <div className="pt-4 flex flex-col gap-2 ">
        <a
          href="/"
          className="text-white underline decoration-solid hover:text-black text-wrap flex flex-col gap-2"
        >
          <p>{props.info}</p>
          <p>{props.info2}</p>
        </a>
      </div>
    </div>
  );
};
