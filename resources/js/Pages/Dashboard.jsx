import React, { useState } from "react";
import { Card, Row, Col, Progress, Button, message } from "antd";
import Layout from "@/Components/Layout";
import { useSpring, animated } from "@react-spring/web";
import Confetti from "react-confetti";
import { CheckCircleOutlined, SettingOutlined } from "@ant-design/icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Dashboard = ({ menus }) => {
  const [progress, setProgress] = useState({
    project: 0,
    design: 0,
    frontend: 0,
  });

  const [confetti, setConfetti] = useState(false);

  // Fungsi untuk menangani klik pada kartu
  const handleClick = (key) => {
    setProgress((prev) => {
      const newProgress = { ...prev, [key]: 100 };

      if (newProgress[key] === 100) {
        let messageContent = "";

        // Notifikasi khusus untuk setiap kartu
        switch (key) {
          case "project":
            messageContent = "Proyek utama selesai! Anda telah berhasil mengerjakan PHP, Flutter, Laravel, CI3.";
            break;
          case "design":
            messageContent = "Desain selesai! Anda telah menguasai Mysql, Postgre SQL.";
            break;
          case "frontend":
            messageContent = "Frontend selesai! Anda telah ahli di React, Javscript, CSS, HTML, Bootsrap<.";
            break;
          default:
            messageContent = "Progres selesai!";
        }

        message.success(messageContent); // Tampilkan pesan notifikasi
        setConfetti(true); // Aktifkan confetti
        setTimeout(() => setConfetti(false), 3000); // Matikan confetti setelah 3 detik
      }

      return newProgress;
    });
  };

  // Animasi berdenyut untuk kartu
  const pulseAnimation = useSpring({
    from: { transform: "scale(1)" },
    to: { transform: "scale(1.1)" },
    config: { tension: 200, friction: 5 },
    loop: true,
  });

  return (
    <Layout menus={menus}>
      {confetti && <Confetti />}

      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome Guys, My Portfolio!</h1>
        <p className="text-gray-600 text-lg">
          Klik pada setiap kartu untuk menyelesaikan progres!
        </p>
      </header>

      <Row gutter={[16, 16]}>
        {/* Kartu Proyek Utama */}
        <Col span={8}>
          <animated.div
            style={progress.project === 100 ? {} : pulseAnimation}
            onClick={() => handleClick("project")}
          >
            <Card
              className="shadow-lg hover:cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #d4fc79, #96e6a1)",
                borderRadius: "10px",
                color: "#2e7d32",
              }}
            >
              <div className="flex items-center">
                <CheckCircleOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
                <h3 className="text-lg font-semibold">PHP, Flutter, Laravel, CI3</h3>
              </div>
              <Progress percent={progress.project} />
            </Card>
          </animated.div>
        </Col>

        {/* Kartu Desain */}
        <Col span={8}>
          <animated.div
            style={progress.design === 100 ? {} : pulseAnimation}
            onClick={() => handleClick("design")}
          >
            <Card
              className="shadow-lg hover:cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
                borderRadius: "10px",
                color: "#8e44ad",
              }}
            >
              <div className="flex items-center">
                <SettingOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
                <h3 className="text-lg font-semibold">Mysql, PostgreSQL</h3>
              </div>
              <Progress
                percent={progress.design}
                strokeColor={{ "0%": "#f56a00", "100%": "#ff9c6e" }}
              />
            </Card>
          </animated.div>
        </Col>

        {/* Kartu Frontend */}
        <Col span={8}>
          <animated.div
            style={progress.frontend === 100 ? {} : pulseAnimation}
            onClick={() => handleClick("frontend")}
          >
            <Card
              className="shadow-lg hover:cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #a8edea, #fed6e3)",
                borderRadius: "10px",
                color: "#1565c0",
              }}
            >
              <div className="flex items-center">
                <CheckCircleOutlined style={{ fontSize: "24px", marginRight: "10px" }} />
                <h3 className="text-lg font-semibold">React, Javscript, CSS, HTML, Bootsrap</h3>
              </div>
              <Progress
                percent={progress.frontend}
                strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
              />
            </Card>
          </animated.div>
        </Col>
      </Row>

      {/* Tombol Reset */}
      <div className="text-center mt-4">
        <Button
          type="primary"
          onClick={() => setProgress({ project: 0, design: 0, frontend: 0 })}
        >
          Reset Progress
        </Button>
      </div>

      {/* Maps Section */}
      <section className="mt-10">
        <h2 className="text-3xl font-bold text-center text-gray-800">Lokasi</h2>
        <p className="text-gray-600 text-center mb-4">Lokasi Saya</p>
        <div
          style={{
            width: "100%",
            height: "400px",
            maxWidth: "1200px",
            margin: "0 auto",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <MapContainer
            center={[-6.217931972626745, 106.72860963457113]} // Koordinat lokasi Anda
            zoom={15} // Zoom lebih dekat
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[-6.217931972626745, 106.72860963457113]}>
              <Popup>Lokasi Anda</Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
