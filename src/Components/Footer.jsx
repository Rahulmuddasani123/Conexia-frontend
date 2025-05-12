import { useSelector } from "react-redux";

function Footer() {
  const user = useSelector((store) => store.User);
  if (!user) return;
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 p-3  ">
      <aside>
        <p>
          <span className="FooterTitle">Conexia </span>&nbsp;- &nbsp;
          <span className="FooterSlogan">Together, Always.</span>
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
