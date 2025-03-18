---
layout: post
title: Big Idea 4 Blog
search_exclude: true
permalink: /bigidea4/
---

# 4.1 The Internet (Video 1)

## Evolution of Computers and Networks
- **1975:** Computers were huge and worked in isolation.  
- Evolution led to **smaller computers** capable of sending and receiving data.  

## Key Concepts  
- **Packet:** A small piece of data sent over a network. It includes the **source** and **destination** information.  
- **Computer Network:** A group of interconnected computing devices capable of sending/receiving data.  
- **Computer System:** A group of computing devices and programs working together for a purpose.  

## Packet Switching  
- The message/file is **broken into packets**, which can be sent in different paths in any order.  
- Example: If sending `"Hello, my name is Soni."`,  
  - `"Soni"` could be sent in one path.  
  - `"name"` could be sent in another path.  
- The **recipient's device** reassembles the packets.  
![image](https://media.geeksforgeeks.org/wp-content/uploads/20240109160206/4514-660.png)

## Routing and Path  
- **Routing:** The process of finding a path from sender to receiver.  
- **Path:** The sequence of connected computing devices that starts at the sender and ends at the receiver.  

## Bandwidth  
- The **maximum amount of data** that can be transmitted in a fixed time.  
- Measured in **bits per second**.  

---

# 4.1 The Internet (Video 2)

## Protocols and Standards  
- **Protocol:** A set of agreed-upon rules that specify the behavior of a system.  
- **OSI (Open Systems Interconnection):** The **7 layers** required for communication.  
- **Internet Engineering Task Force (IETF):**  
  - Manages the development of standards and technical discussions for the internet in an open, collaborative process.  

## Transmission Control Protocol (TCP)  
- Establishes a common standard for sending messages between devices on the internet.  
![image](https://neosnetworks.com/wp-content/uploads/2024/12/OSI-model-vs-TCP-IP-model.png)

## Network Layers  

### **1. Network Access Layer** (Hardware Layer)
- **Includes:**  
  - Fiber, MAC (Media Access Control), Ethernet, NIC (Network Interface Cards), wires.  

### **2. Network/Internet Layer (Data Transmission - IP)**
- **Packets get set up with metadata** (contains routing information).  
- **Routers:** Special-purpose computers with a MAC address that direct packets.  
- **Analogy:** Routers are like people passing a note in class (many different paths possible).  
- **Internet Scalability:**  
  - Designed to **scale** (change in size and meet new demands).  
  - Starts with **Local Area Network (LAN)** → moves to **Autonomous Systems (AS)** → connects to **The Internet**.

### **3. Transport Layer**  
- Handles **how packets are sent** and **error control**.  
- **Transport Control Protocol (TCP):**  
  - Does error checking and recovery (more reliable but slower).  
- **User Datagram Protocol (UDP):**  
  - Performs error checking but discards incorrect packets (faster but less reliable).  

### **4. Internet Layer (IP Addressing)**  
- **Three types of addressing:**  
  1. **Unicast:** One specific device (Internet-wide access, uses TCP).  
  2. **Multicast:** A group of devices (uses a specific IP range, Internet-wide access, uses UDP).  
  3. **Broadcast:** Sent to all devices in a LAN (data stops at the router, uses UDP).  

![image](https://radhikaclasses.com/wp-content/uploads/2021/02/unicast-multicast-broadcast-image3-1-1.jpg)
---

## **Application Layer**
- **Webservers:** Programs running on machines connected to the internet.  
- **DNS (Domain Name System):**  
  - Translates human-readable URLs into IP addresses (e.g., `www.mywebsite.com`).  

### **Key Protocols in the Application Layer**  
- **HTTP (HyperText Transfer Protocol):**  
  - Used to request/receive data from web servers.  
  - Uses **TCP port 80** at the transport layer.  
- **HTTPS (Secure HTTP):**  
  - Like HTTP but with security encryption.  
  - Uses **TCP port 443**.  



# 4.2 Fault Tolerance (Video #3)

## CSN-1.E - Learning Objective

For fault-toleranct systems, like the Internet:
  a. Describe the benefits of fault tolerance.
  b. Explain how a given system is fault-tolerant.
  c. Identify vulnerabilities to failure in a system.

## Essential Knowledge

**CSN-1.E1:** The Internet has been engineered to be fault tolerant, with abstractions for routing and transmitting data.

**CSN-1.E2:** Redundancy is the inclusion of extra components that can be used to mitigate failure of a system if other components fail.

**CSN-1.E3:** One way to accomplish network redundancy is by having more than one path between any to connected devices.

**CSN-1.E4:** If a particular device or connection on the internet fails, subsequent data will be sent via a different route, if possible.

**CSN-1.E5:** When a system can support failures and still continue to function, is is called fault tolerant. This is important because elements of complex systems fail at unexpected times, often in groups, and fault tolerance allows users to continue to use the network.

**CSN-1.E6:** Redundancy within a system often requires additional resources but can provide the benefit of fault tolerance.

**CSN-1.E7:** The redundancy of routing options between two points increases the reliability of the Internet and helps it scale to the more devices and more people.

## Network Examples

Networks must be both efficient while also allowing for conservation of resources.

Ex: **A** to **B** to **C** to **D** to **E** to **F** to **G**

```
for path in points:
  if path == "A":
    return 1
  elif path == "B":
    return 2
  elif path == "C":
    ...
  elif path == "G":
    return 7
```

This path is great at conserving resources but cannot continue if one path breaks (i.e. **B** breaks, removing access to rest of network)

Ex: **A** to **All other points**, **B** to **All other points**, etc.

```
for point in points:
  for i in range(1,len(points)+1):
    return i
```

This path is great at preventing the previous issue but does not conserve resources (i.e. **B** breaks, but **All other paths** are still connected. But heavy on resource use.)

This path is fault-tolerant.

Ex: **A** to **F** and **E**, **B** to **G** and **D**, etc.

```
for point in points:
  if point == "A":
    return (6, 5)
  elif point == "B":
    return (7, 4)
  elif point == "C":
    ...
  elif point == "G":
    return (1, 2)
```

This example is fault-tolerant because if one path breaks, another always connects to the same point in the network. There are multiple paths data can travel to each point in the network, allowing for better fault-tolerance.

This network is also efficient in resources, by not creating paths to each point per point. Rather, each point has a select few paths closest to it, that continue onwards. This format also allows for better implementation of new points that can send and recieve data.


## Main Take Aways

The internet is a fault tolerant system, through tests and different examples, we can see the vulnerabilites and failures of the different network connections. For a network to be fault-tolerant it must make sure all paths are able to connect whether or not a path fails, but it must also make up for an ineffective way of management of resources.


# 4.3 Parallel and Distributed Programming (Video #5)

## Learning Objectives

**CSN-2.A:** For sequential, parallel, and distributed computing
a. Compare problem solutions.
b. Determine the efficiency of solutions and describe benefits and challenges of parallel and distributed programming.

**CSN-2.B:** Describe Benefits and challenges of parallel and distributed programming.

