import { ShieldCheck, Medal, Truck, Box } from "lucide-react";

interface AuthenticityItem {
  icon: React.ReactNode;
  title: string;
  isPrimary?: boolean;
}

const ProductAuthenticity = () => {
  const items: AuthenticityItem[] = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "100% Original",
      isPrimary: true,
    },
    { icon: <Medal className="w-8 h-8" />, title: "Certified by Brands" },
    { icon: <Truck className="w-8 h-8" />, title: "Direct Sourcing" },
    { icon: <Box className="w-8 h-8" />, title: "Secure Packaging" },
  ];

  return (
    <div className="bg-white flex items-center justify-center p-4">
      <div className="w-full mr-24 ml-24  bg-white shadow-lg rounded-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              <h2
                className={`text-xl font-bold ${
                  item.isPrimary ? "text-primary" : "text-gray-800"
                }`}
              >
                {item.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductAuthenticity;
