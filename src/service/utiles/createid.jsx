const Createid = () => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  const id = timestamp + Math.random().toString(12).substring(2, 8);
  return id;
};

export default Createid;
