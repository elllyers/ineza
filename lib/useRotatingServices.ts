import { useState, useEffect } from "react";

interface Service {
  name: string;
  icon?: string;
  img?: string;
  description?: string;
}

export const useRotatingServices = () => {
  const [currentService, setCurrentService] = useState(0);
  const services: Service[] = [
    {
      name: "Banking Agent",
      img: "/agent.png",
      description: "Secure banking transactions",
    },
    {
      name: "Irembo Services",
      img: "/iremboicon.png",
      description: "Government services at your fingertips",
    },
    {
      name: "Invitations",
      img: "/invite.png",
      description: "Custom digital invitations",
    },
    {
      name: "Stationery",
      img: "/stationa.png",
      description: "Professional stationery solutions",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [services.length]);

  return {
    currentService: services[currentService],
    allServices: services,
  };
};
