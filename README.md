# 🔥 **CVEscan: Vulnerability Scanner by FrostFoe**

### **CVEscan - Simplified Web Vulnerability Scanning**  

**CVEscan** is a lightweight, command-line tool for scanning web applications for **known vulnerabilities**. Designed for ethical hackers and cybersecurity researchers, this tool integrates seamlessly with the CVE database to provide real-time vulnerability insights.  

Prepare to scan smartly and stay secure! 🚀  

---

## 🌟 **Key Features**

- **🔍 Vulnerability Detection**  
  Detect and report **known CVEs** for any given web application by querying its IP and port details.  

- **⚡ Real-Time API Integration**  
  Access **up-to-date CVE data** directly from trusted sources for reliable results.  

- **🌐 Target Analysis**  
  Extract **IP addresses** and identify open ports for thorough reconnaissance.

- **📊 Concise Reporting**  
  Get a detailed summary of vulnerabilities, including:  
  - **CVE ID**
  - **CVSS Score**
  - **Affected Ports**
  - **Vulnerability Summary**

- **🎮 Simple Command-Line Usage**  
  Minimalistic design makes scanning quick and efficient.

---

## 🚀 **Quick Start**

### 🛠️ **Prerequisites**  
- **Node.js**

### 📥 **Setup**  
Clone the repository and install dependencies:  

```bash
git clone https://github.com/FrostFoe/CVEscan.git
cd CVEscan
npm install
```

### 🎮 **Launch CVEscan**  
Run the tool with:  

```bash
node cvescan.js -u <target_url>
```  

**Example:**  
```bash
node cvescan.js -u https://example.com
```

## 📝 **Command Cheat Sheet**  

| **Command**       | **Description**                                | **Example**                        |
|--------------------|-----------------------------------------------|------------------------------------|
| `-u <URL>`        | Specify the target URL to scan                | `node cvescan.js -u https://example.com` |
| `--help`          | Display help for available commands           | `node cvescan.js --help`          |

---

## 🌌 **Features in Action**

- **Target Analysis:**  
  Input your target URL, and CVEscan will extract the **IPv4 address** and query open ports.  

- **CVE Matching:**  
  For each target, CVEscan identifies vulnerabilities based on the CVE database. Example output:  

```bash
Processing Target URL: https://example.com
Coded by FrostFoe.
IPv4 Address: 192.168.1.1
Vulnerabilities: {
  'CVE-2024-XXXX': {
    cvss: 7.8,
    ports: [80],
    summary: 'Detailed vulnerability description.',
    verified: false
  },
  ...
}
```

---

## 🔐 **Security and Disclaimer**  

> **CVEscan is intended solely for educational and research purposes.**  
> **Unauthorized use** against systems without explicit consent is **illegal**. The creators and contributors are not liable for any misuse or damage caused by this tool.  

**Stay ethical and hack responsibly!** 🚨  

---

## 🌐 **Connect with FrostFoe**  

- **GitHub:** [@FrostFoe](https://github.com/FrostFoe)  
- **Telegram:** [FrostFoe](https://t.me/FrostFoe)  

Feedback and contributions are always welcome!  

---
**CVEscan - Simplify Vulnerability Assessment!** 🚀  
```
