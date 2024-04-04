export const FooterInfo = (props: { info1: string; info2: string }) => {
  return (
    <div className="flex flex-col pb-8">
      <p className="text-3xl text-white font-semibold">Quick Links</p>
      <div className="pt-4 flex flex-col gap-2">
        <a
          href="/"
          className="text-white underline decoration-solid hover:text-black"
        >
          {props.info1}
        </a>
        <a
          href="/"
          className="text-white underline decoration-solid hover:text-black"
        >
          {props.info2}
        </a>
      </div>
    </div>
  );
};
