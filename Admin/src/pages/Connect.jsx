import React, { useState, useEffect } from "react";

export default function TrangKetNoi() {
  const [activeTab, setActiveTab] = useState("social");
  const [animate, setAnimate] = useState(false);
  const [connectionLines, setConnectionLines] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  const socialNetworks = [
    {
      id: 1,
      name: "Facebook",
      icon: "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z",
      color: "#1877F2",
    },
    {
      id: 2,
      name: "Instagram",
      icon: "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z",
      color: "#E4405F",
    },
    {
      id: 3,
      name: "Twitter",
      icon: "M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z",
      color: "#1DA1F2",
    },
    {
      id: 4,
      name: "LinkedIn",
      icon: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z",
      color: "#0A66C2",
    },
    {
      id: 5,
      name: "YouTube",
      icon: "M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z",
      color: "#FF0000",
    },
    {
      id: 6,
      name: "TikTok",
      icon: "M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z",
      color: "#000000",
    },
  ];

  const partners = [
    {
      id: 1,
      name: "Công ty ABC",
      logo: "/public/images/image2.png",
      color: "#3B82F6",
    },
    {
      id: 2,
      name: "Tập đoàn XYZ",
      logo: "/public/images/image2.png",
      color: "#10B981",
    },
    {
      id: 3,
      name: "Đối tác DEF",
      logo: "/public/images/image2.png",
      color: "#F59E0B",
    },
    {
      id: 4,
      name: "Tổ chức MNO",
      logo: "/public/images/image2.png",
      color: "#8B5CF6",
    },
    {
      id: 5,
      name: "Công ty GHI",
      logo: "/public/images/image2.png",
      color: "#EC4899",
    },
    {
      id: 6,
      name: "Doanh nghiệp JKL",
      logo: "/public/images/image2.png",
      color: "#EF4444",
    },
  ];

  const communityMembers = [
    {
      id: 1,
      name: "Cộng đồng Lập trình viên",
      members: "15,000+",
      color: "#3B82F6",
    },
    { id: 2, name: "Cộng đồng Thiết kế", members: "8,500+", color: "#10B981" },
    {
      id: 3,
      name: "Cộng đồng Marketing",
      members: "12,000+",
      color: "#F59E0B",
    },
    {
      id: 4,
      name: "Cộng đồng Khởi nghiệp",
      members: "5,200+",
      color: "#8B5CF6",
    },
    {
      id: 5,
      name: "Cộng đồng Nghiên cứu",
      members: "7,300+",
      color: "#EC4899",
    },
    { id: 6, name: "Cộng đồng Giáo dục", members: "10,400+", color: "#EF4444" },
  ];

  useEffect(() => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 1000);

    // Tạo các đường kết nối ngẫu nhiên
    createConnectionLines();
  }, [activeTab]);

  const createConnectionLines = () => {
    const lines = [];
    for (let i = 0; i < 15; i++) {
      lines.push({
        id: i,
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100,
        thickness: Math.random() * 2 + 0.5,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
        color: `hsla(${Math.random() * 60 + 220}, 70%, 60%, 0.3)`,
      });
    }
    setConnectionLines(lines);
  };

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
  };

  const getDataForActiveTab = () => {
    switch (activeTab) {
      case "social":
        return socialNetworks;
      case "partners":
        return partners;
      case "community":
        return communityMembers;
      default:
        return socialNetworks;
    }
  };

  return (
    <div className="min-h-screen rounded-xl bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-12 px-4 md:px-8 relative overflow-hidden">
      {/* Background animation lines */}
      <div className="absolute inset-0 overflow-hidden">
        {connectionLines.map((line) => (
          <div
            key={line.id}
            className="absolute opacity-30"
            style={{
              left: `${line.x1}%`,
              top: `${line.y1}%`,
              width: `${Math.sqrt(
                Math.pow(line.x2 - line.x1, 2) + Math.pow(line.y2 - line.y1, 2)
              )}%`,
              height: `${line.thickness}px`,
              background: line.color,
              transform: `rotate(${
                Math.atan2(line.y2 - line.y1, line.x2 - line.x1) *
                (180 / Math.PI)
              }deg)`,
              transformOrigin: "0 0",
              animation: `pulse ${line.duration}s ease-in-out ${line.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Particles decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              background: `rgba(${Math.random() * 100 + 100}, ${
                Math.random() * 100 + 100
              }, ${Math.random() * 255}, 0.3)`,
              animation: `float ${Math.random() * 10 + 10}s linear ${
                Math.random() * 5
              }s infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl p-2 flex justify-center md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Kết Nối Cộng Đồng
            <span className="relative inline-block">
              <span className="absolute bottom-1 left-0 w-full h-3 bg-indigo-200 transform -skew-x-12 -z-10"></span>
            </span>
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Mở rộng mạng lưới của bạn và kết nối với đối tác, mạng xã hội và
            cộng đồng của chúng tôi
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => handleTabChange("social")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 relative overflow-hidden ${
              activeTab === "social"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-blue-50"
            }`}
          >
            <span className="relative z-10">Mạng Xã Hội</span>
            {activeTab === "social" && (
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 -z-0"></span>
            )}
          </button>
          <button
            onClick={() => handleTabChange("partners")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 relative overflow-hidden ${
              activeTab === "partners"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-blue-50"
            }`}
          >
            <span className="relative z-10">Đối Tác</span>
            {activeTab === "partners" && (
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 -z-0"></span>
            )}
          </button>
          <button
            onClick={() => handleTabChange("community")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 relative overflow-hidden ${
              activeTab === "community"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-blue-50"
            }`}
          >
            <span className="relative z-10">Cộng Đồng</span>
            {activeTab === "community" && (
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 -z-0"></span>
            )}
          </button>
        </div>

        {/* Content */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ${
            animate
              ? "opacity-0 transform translate-y-10"
              : "opacity-100 transform translate-y-0"
          }`}
        >
          {getDataForActiveTab().map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden cursor-pointer group`}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background decoration */}
              <div
                className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${item.color}22, ${item.color}66)`,
                }}
              ></div>

              {/* Connection lines animation when hovered */}
              {hoveredCard === item.id &&
                Array.from({ length: 8 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="absolute w-px h-16 bg-indigo-400 opacity-40"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                      animation: `pulse 3s ease-in-out ${
                        idx * 0.2
                      }s infinite alternate`,
                    }}
                  ></div>
                ))}

              <div className="flex items-center mb-5 gap-4 relative">
                {activeTab === "social" ? (
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: `${item.color}15` }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill={item.color}
                      viewBox="0 0 16 16"
                      className="relative z-10"
                    >
                      <path d={item.icon} />
                    </svg>
                  </div>
                ) : activeTab === "partners" ? (
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden"
                    style={{ background: `${item.color}15` }}
                  >
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                ) : (
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                    style={{ background: `${item.color}15`, color: item.color }}
                  >
                    {item.name.charAt(0)}
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {item.name}
                  </h3>
                  {activeTab === "community" && (
                    <p className="text-sm text-indigo-600 font-medium">
                      {item.members} thành viên
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-opacity-20 hover:bg-opacity-100 hover:text-white`}
                  style={{
                    backgroundColor: `${item.color}20`,
                    color: item.color,
                    borderColor: item.color,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = item.color;
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = `${item.color}20`;
                    e.target.style.color = item.color;
                  }}
                >
                  Kết nối ngay
                </button>
                <div className="text-gray-400 group-hover:text-indigo-500 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Connection CTA */}
        <div className="mt-16 text-center">
          <button className="relative inline-flex items-center px-8 py-4 overflow-hidden text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full group">
            <span className="absolute left-0 w-full h-0 transition-all bg-white opacity-10 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="relative flex items-center gap-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              Khám phá tất cả kết nối
            </span>
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 0.2;
          }
          100% {
            opacity: 0.6;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(20px);
          }
          75% {
            transform: translateY(-30px) translateX(-10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
