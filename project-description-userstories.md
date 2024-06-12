SecurIoTy - Project Description and User Stories

**Project Description:** 

1\) As IoT devices are becoming increasingly common, the need for cyber security professionals with the skill-set to secure these devices is becoming vital. Many cybersecurity students lack hands-on experience dealing with the unique challenges posed by IoT security. To address this problem we are proposing a Virtual Machine based solution similar to TryHackMe, built for simulated IoT devices.

2\) The intended users of our project will be cybersecurity students and professionals who are looking to increase their knowledge of IoT devices and their attack vectors. Instructors with knowledge of IoT devices may also be interested in contributing to the development of this project technically, or through lab ideas.

3\) The user is needing this lab because there is a huge security risk in IoT, and learning how these attacks happen in a simulated lab will help better inform the user of how to protect IoT devices. There are many options on how to build this solution as a user who wants to learn how to protect IoT devices, which are difficult to simulate in a controlled environment where the attacker and end device can be controlled. 

4\) A solution would help the user learn how IoT device attacks happen, and how to better protect IoT devices in their home, school, work, since IoT devices are embedded in everyday lives. This could be further used by universities or professional institutions to teach users how to protect, defend, and detect attacks on IoT devices. 

5\) A general flow to address the problem would include building out a network topology that includes an attacker and an end device, and then simulate different attack types on the IoT device. This would show the user the flow of attack and the outcomes of said attack, and then ultimately show how an IoT device could be defended from an attack. This would be shown through an interface to the user that can interact with the IoT device or the attacking device. 

6\) The nature of the solution is going to be a website similar to TryHackMe, where students can participate in IoT labs. The website will offer virtual machines and network simulation software in order to give the user all the tools necessary for learning. 

7\) As far as software components go, for the website itself some sort of library like React or Vue will be used. The network simulator this project will utilize is Cooja which runs on the Contiki operating system. As far as dev ops go, our website and virtual machines will be hosted on Azure. This is the general idea and is subject to change.

8\) Since the project is focused on IoT defense, hardware such as raspberry pi's for attacking, and victim devices such as smart lights, cameras, etc. could ideally be utilized when available. In absence of this hardware, simulated devices will be available and suffice for the project's goals.

9\) TryHackMe (THM) and Zybooks are similar, but more limited, solutions. Both of these solutions offer reading material and fill-in-the-blank style questions, which is necessary, but their reliance on that method of delivery can be disengaging. It also limits the scope of what the user can be taught; some material (in this case, it might be a specific attack) might be much better delivered to the user in the form of a demonstration rather than a lecture. THM does have access to a virtual environment, but they do not have IoT devices (whether they're real or simulated), making the virtual environment less impactful. Zybooks does not have a virtual environment, but does have fill-in-the-blank style questions that can run snippets of code. In addition, the THM and Zybooks platforms are meant to be flexible and diverse with the courses they offer, and are not targeted specifically at IoT security. This means their material/courses are limited in what they can offer the user.

Our solution will utilize simulated IoT devices (and maybe actual IoT devices in the future). We argue that our solution will be more effective, engaging and enjoyable for the use

**User Stories (unfiltered):**

- As a professor, I want an interactive environment to teach IoT security so that students gain hands-on experience.

- As a cybersecurity professional, I want better training materials so I can easily identify IoT vulnerabilities.

- As an IoT device developer, I want to learn about common attacks so I can create more secure devices.

* As a user, I want to use a seamless lab platform so that I can learn the risks associated with IoT devices, and learn to better protect those devices.

* As a developer, I want to implement a simulated attack environment on an IoT device so that I can show risks and attack paths to a user.

* As a developer, I want to create an IoT lab platform so that classes in universities or other professional entities can benefit from the platform.

* As a developer, I want to find the best way to host a virtual machine so that it is efficient, fast, and easy to use.

* As a developer, I want to explore different network topologies and attack types so that I can develop 2-3 labs that can be used and delivered at the end of this project.

* As a developer, I want to create an easy to use interface so that users can interact with the lab and the virtual machine simultaneously.

* As a developer, I want to create a unique and interactive platform to learn about IoT security so that students can enjoy what they are learning.

* As a team we need to decide if we want to physically use IoT devices so that we can implement real attacks into the development of our platform.

- As a student, I want an intuitive environment to do my IoT labs.

- As a student, I want to have everything I need in one place, so that the process of completing my homework is as easy as possible.

- As a student, I want to be able to use my own IoT devices within my simulated network so that I can accompany my learning with a real world example.

- As a student, I want to be able to get feedback on my progress so I can learn effectively.

- As a student, I want to have simulated IoT devices available so that I can still complete tasks without the hardware.

* As a student, I want to be able to simulate different attacks on IoT devices so I can test my understanding of vulnerabilities.

* As an enthusiast, I want a platform where I can learn about vulnerabilities on IoT devices, to get a better understanding of real-world threats.

* As a developer, I want to create an in-depth and interactive system where users can learn about vulnerabilities on IoT devices, to help spread awareness of threats that may affect them.

* As a professor, I want an interactive and engaging platform where students can learn about IoT cybersecurity, to get more people in the next generation interested in cybersecurity.

**Glossary:**

**Internet of Things(IoT):** network of connected devices in everyday devices that allows them to send and receive data.

**IoT devices:** Devices that make up the IoT, typically a household device with an added  secondary function of connecting to the internet. Examples include: smart watches, devices like Ring Doorbells, smart fridges, smart speakers like the Amazon Echo, smart thermostats like the Google Nest.

**Virtual Machine(VM):** Computer software that emulates the functionality of another separate physical computer.

**TryHackMe(THM):** An in browser VM that allows users to emulate cyber attacks.

**Attack Vectors:** A pathway or method used by an attacker to illegally access a network or computer in an attempt to exploit system vulnerabilities.

**Simulated Lab:** The secure environment emulated by the VM where the user can practice cyber attacks for educational purposes.

**IoT device attacks:** Cyber attacks that aim to exploit IoT devices.

**Network Topology:** The physical or logical diagram describing a network and how devices are connected.

**End Device:** A web-enabled hardware device that serves as either the source or destination of data transferred through a network. Examples include: laptops, desktop computers, printers, scanners, tablets, cell phones, and IoT devices.

**Flow of Attack:** A model with supporting tooling and examples for describing sequences of adversary behaviors. Attack flows help defenders understand, share, and make threat-informed decisions based on the sequence of actions in a cyber-attack.

**Interface:** The exchange of information between two or more separate components of a computer system.

**React:** A library for web and native user interfaces. <https://react.dev/> 

**Vue.js (Vue):** An open-source model–view–viewmodel front end JavaScript library for building user interfaces and single-page applications.

**Cooja:** A network simulator which permits the emulation of real hardware platforms.

**Contiki:** An operating system for networked, memory-constrained systems with a focus on low-power wireless IoT devices.

**Microsoft Azure(Azure):** A cloud computing platform run by Microsoft. It offers access, management, and the development of applications and services through global data centers.

**Raspberry Pi:** A minicomputer the size of a credit card that is interoperable with any input and output hardware device.

**Virtual Environment:** The user environment emulated by a virtual machine. 

**Zybooks:** An in browser VM and educational platform, very similar to TryHackMe.
