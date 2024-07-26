import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div>
        <Image
          width={65}
          height={65}
          src={"/assets/images/logo.png"}
          alt="taskify logo"
        />
      </div>
    </Link>
  );
};

export default Logo;
