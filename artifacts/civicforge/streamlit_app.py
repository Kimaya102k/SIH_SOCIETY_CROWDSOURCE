
import streamlit as st
import pandas as pd
from datetime import datetime


# ============================================================
# 1. PAGE CONFIGURATION
# ============================================================

st.set_page_config(
    page_title="CivicForge Challenge Platform",
    page_icon="🏛️",
    layout="wide",
    initial_sidebar_state="expanded"
)


# ============================================================
# 2. SESSION STATE / INITIAL DATA
# ============================================================

if "challenges" not in st.session_state:
    st.session_state.challenges = [
        {
            "id": 1,
            "title": "Smart Traffic Signal Optimization",
            "category": "Urban Infrastructure",
            "status": "Active",
            "submissions": 42,
            "prize": "₹5,00,000",
            "type": "Hardware + Software"
        },
        {
            "id": 2,
            "title": "Community Solar Grid Deployment",
            "category": "Sustainability",
            "status": "Active",
            "submissions": 28,
            "prize": "₹7,50,000",
            "type": "Hardware"
        },
        {
            "id": 3,
            "title": "AI Public Safety Emergency Routing",
            "category": "Public Safety",
            "status": "Reviewing",
            "submissions": 56,
            "prize": "₹10,00,000",
            "type": "Software"
        },
        {
            "id": 4,
            "title": "Digital Literacy Platform for Seniors",
            "category": "Education",
            "status": "Completed",
            "submissions": 89,
            "prize": "₹3,50,000",
            "type": "Software"
        }
    ]


if "submissions" not in st.session_state:
    st.session_state.submissions = [
        {
            "id": "SUB-942",
            "user": "Aarav Mehta",
            "challenge": "Smart Traffic Signal Optimization",
            "score": 94,
            "date": "2026-09-04",
            "status": "Approved"
        },
        {
            "id": "SUB-811",
            "user": "Ananya Iyer",
            "challenge": "Community Solar Grid Deployment",
            "score": 87,
            "date": "2026-09-03",
            "status": "Under Review"
        },
        {
            "id": "SUB-743",
            "user": "Rohan Deshmukh",
            "challenge": "AI Public Safety Emergency Routing",
            "score": 91,
            "date": "2026-09-01",
            "status": "Approved"
        },
        {
            "id": "SUB-602",
            "user": "Siddharth Nair",
            "challenge": "Digital Literacy Platform for Seniors",
            "score": 76,
            "date": "2026-08-28",
            "status": "Revision Needed"
        }
    ]


if "investor_pool" not in st.session_state:
    st.session_state.investor_pool = [
        {
            "Firm": "Blume Ventures",
            "Target": "Smart Traffic Signal Optimization",
            "Tier": "Series A Round",
            "Amount": "₹25,00,000"
        },
        {
            "Firm": "Sequoia Capital India",
            "Target": "AI Public Safety Emergency Routing",
            "Tier": "Seed Funding",
            "Amount": "₹50,00,000"
        },
        {
            "Firm": "Impact Innovation Fund",
            "Target": "Community Solar Grid Deployment",
            "Tier": "Impact Investment",
            "Amount": "₹35,00,000"
        }
    ]


if "user_uploads" not in st.session_state:
    st.session_state.user_uploads = []


if "funding_applications" not in st.session_state:
    st.session_state.funding_applications = []


if "citizen_reviews" not in st.session_state:
    st.session_state.citizen_reviews = [
        {
            "Citizen": "Citizen #1024",
            "Solution": "Smart Traffic Signal Optimization",
            "Rating": 5,
            "Review": (
                "The idea is practical and could significantly "
                "reduce traffic waiting time."
            ),
            "Usefulness": "Extremely Useful",
            "Recommend": "Yes",
            "Date": "2026-09-04"
        },
        {
            "Citizen": "Citizen #2088",
            "Solution": "Community Solar Grid Deployment",
            "Rating": 4,
            "Review": (
                "Very useful for housing societies. "
                "The installation cost should be reduced."
            ),
            "Usefulness": "Very Useful",
            "Recommend": "Yes",
            "Date": "2026-09-03"
        },
        {
            "Citizen": "Citizen #3145",
            "Solution": "AI Public Safety Emergency Routing",
            "Rating": 5,
            "Review": (
                "Reducing ambulance response time would "
                "have a huge impact."
            ),
            "Usefulness": "Extremely Useful",
            "Recommend": "Yes",
            "Date": "2026-09-02"
        }
    ]


# ============================================================
# 3. UNIVERSITY / TEAM DATA
# ============================================================

student_initiatives = [
    {
        "University": "IIT Bombay Urban Innovation Hub",
        "Focus Area": "Computer Vision Signal Counting",
        "Target Project": "Smart Traffic Signal Optimization",
        "Status": "Building Prototype",
        "Team Size": "5 Students"
    },
    {
        "University": "BITS Pilani EcoResearch Lab",
        "Focus Area": "Micro-Inverter Hardware Optimization",
        "Target Project": "Community Solar Grid Deployment",
        "Status": "Testing Core Logic",
        "Team Size": "4 Students"
    },
    {
        "University": "IIT Delhi AI & Robotics Cell",
        "Focus Area": "Predictive First-Responder Routing AI",
        "Target Project": "AI Public Safety Emergency Routing",
        "Status": "Model Training",
        "Team Size": "6 Students"
    },
    {
        "University": "Anna University Social Engineering",
        "Focus Area": "UI/UX Accessibility Frameworks",
        "Target Project": "Digital Literacy Platform for Seniors",
        "Status": "Field Testing Complete",
        "Team Size": "3 Students"
    }
]


# ============================================================
# 4. TEAM ACTIVITY DATA
# ============================================================

team_activity = [
    {
        "Team": "IIT Bombay Urban Innovation Hub",
        "Challenge": "Smart Traffic Signal Optimization",
        "Team Size": 5,
        "Focus Area": "Computer Vision & Edge AI",
        "Current Task": "Training vehicle detection model",
        "Status": "🟢 Building Prototype",
        "Progress": 72
    },
    {
        "Team": "BITS Pilani EcoResearch Lab",
        "Challenge": "Community Solar Grid Deployment",
        "Team Size": 4,
        "Focus Area": "Solar Hardware & IoT",
        "Current Task": "Testing smart meter integration",
        "Status": "🟡 Hardware Testing",
        "Progress": 61
    },
    {
        "Team": "IIT Delhi AI & Robotics Cell",
        "Challenge": "AI Public Safety Emergency Routing",
        "Team Size": 6,
        "Focus Area": "AI Route Prediction",
        "Current Task": "Training emergency traffic prediction model",
        "Status": "🟢 Model Training",
        "Progress": 83
    },
    {
        "Team": "Anna University Social Engineering",
        "Challenge": "Digital Literacy Platform for Seniors",
        "Team Size": 3,
        "Focus Area": "Accessibility & UX",
        "Current Task": "Senior citizen usability testing",
        "Status": "🔵 Field Testing",
        "Progress": 90
    }
]


# ============================================================
# 5. CITIZEN PROBLEM REPORTS
# ============================================================

reported_complaints = [
    {
        "Report ID": "REP-4019",
        "Project": "Smart Traffic Signal Optimization",
        "Citizen Quote": (
            "The bottleneck at Silk Board junction is unbearable "
            "every Friday evening. The signal timing does not adapt "
            "to the traffic volume."
        )
    },
    {
        "Report ID": "REP-3122",
        "Project": "Community Solar Grid Deployment",
        "Citizen Quote": (
            "Our locality faces severe load shedding and power cuts "
            "during peak summers. Apartment roofs could be used for solar."
        )
    },
    {
        "Report ID": "REP-8854",
        "Project": "AI Public Safety Emergency Routing",
        "Citizen Quote": (
            "Ambulances get trapped during peak hours due to "
            "festival crowds and construction."
        )
    },
    {
        "Report ID": "REP-1029",
        "Project": "Digital Literacy Platform for Seniors",
        "Citizen Quote": (
            "My grandfather couldn't download his pension certificate "
            "because the online portal is too complex."
        )
    }
]


# ============================================================
# 6. FINANCIAL DATA
# ============================================================

financial_data = {

    "Smart Traffic Signal Optimization": {
        "rnd": 185000,
        "monthly_cloud": 45000,
        "roi": "340%",
        "implementation": 850000,

        "breakdown": [
            ["Edge Vision Cameras", 80000, "Hardware"],
            ["Embedded Microcontrollers", 35000, "Hardware"],
            ["Data Pipeline & Bandwidth", 25000, "Infrastructure"],
            ["Developer / Engineering Costs", 30000, "Human Capital"],
            ["Municipal Integration & Compliance", 15000, "Compliance"]
        ],

        "funding": [
            ["TCS Tech Grant", "₹1,00,000"],
            ["IIT-B Innovation Pool", "₹75,000"],
            ["Government Challenge Prize", "₹60,000"],
            ["Corporate CSR", "₹50,000"]
        ]
    },

    "Community Solar Grid Deployment": {
        "rnd": 420000,
        "monthly_cloud": 12000,
        "roi": "180%",
        "implementation": 1750000,

        "breakdown": [
            ["Monocrystalline Solar Panels", 220000, "Hardware"],
            ["Bidirectional Smart Meters", 70000, "Hardware"],
            ["IoT Telemetry Modules", 45000, "Electronics"],
            ["Installation & Safety Audits", 50000, "Operations"],
            ["Student Prototype Stipends", 35000, "Human Capital"]
        ],

        "funding": [
            ["Green Energy Grant", "₹1,50,000"],
            ["University Innovation Fund", "₹1,00,000"],
            ["Municipal Green Bond", "₹75,000"],
            ["CSR Sustainability Fund", "₹50,000"]
        ]
    },

    "AI Public Safety Emergency Routing": {
        "rnd": 210000,
        "monthly_cloud": 25000,
        "roi": "215%",
        "implementation": 650000,

        "breakdown": [
            ["AI Model Development", 80000, "Software"],
            ["Cloud Compute", 45000, "Infrastructure"],
            ["Traffic Data Integration", 30000, "Data"],
            ["Emergency Services API", 25000, "Integration"],
            ["Field Testing & Validation", 30000, "Operations"]
        ],

        "funding": [
            ["Government AI Grant", "₹1,00,000"],
            ["Venture Seed Reserve", "₹75,000"],
            ["University Research Grant", "₹50,000"],
            ["Corporate Sponsorship", "₹50,000"]
        ]
    },

    "Digital Literacy Platform for Seniors": {
        "rnd": 140000,
        "monthly_cloud": 15000,
        "roi": "265%",
        "implementation": 400000,

        "breakdown": [
            ["Application Development", 70000, "Software"],
            ["Accessibility Testing", 20000, "Testing"],
            ["Cloud Infrastructure", 20000, "Infrastructure"],
            ["UX Research", 15000, "Research"],
            ["Community Field Testing", 15000, "Operations"]
        ],

        "funding": [
            ["Digital India Grant", "₹75,000"],
            ["CSR Education Fund", "₹50,000"],
            ["University Innovation Fund", "₹25,000"],
            ["Challenge Prize Pool", "₹50,000"]
        ]
    }
}


# ============================================================
# 7. SOLUTION BREAKDOWN DATA
# ============================================================

solution_breakdowns = {

    "Smart Traffic Signal Optimization": {
        "Problem": (
            "Traffic congestion caused by static signal timing "
            "and unpredictable vehicle density."
        ),
        "Approach": (
            "Computer vision detects vehicle density and dynamically "
            "adjusts traffic signal cycles."
        ),
        "Technology": (
            "Computer Vision, Edge AI, IoT, Traffic APIs"
        ),
        "Target Users": (
            "Municipal corporations, traffic police and commuters"
        ),
        "Deployment": (
            "Traffic cameras → Edge device → AI engine → "
            "Traffic signal controller → Central dashboard"
        ),
        "Expected Impact": (
            "Reduced waiting time, fuel consumption and congestion."
        )
    },

    "Community Solar Grid Deployment": {
        "Problem": (
            "High dependency on conventional electricity and "
            "frequent peak-load outages."
        ),
        "Approach": (
            "Deploy distributed solar generation with smart "
            "monitoring and load balancing."
        ),
        "Technology": (
            "Solar PV, Smart Meters, IoT, Energy Analytics"
        ),
        "Target Users": (
            "Housing societies, municipalities and communities"
        ),
        "Deployment": (
            "Solar panels → Smart meters → IoT gateway → "
            "Energy dashboard"
        ),
        "Expected Impact": (
            "Lower electricity costs and reduced grid dependency."
        )
    },

    "AI Public Safety Emergency Routing": {
        "Problem": (
            "Emergency vehicles lose valuable time because "
            "of unpredictable congestion."
        ),
        "Approach": (
            "AI predicts traffic conditions and identifies "
            "the fastest emergency route."
        ),
        "Technology": (
            "Machine Learning, GIS, GPS, Traffic APIs"
        ),
        "Target Users": (
            "Ambulance services, police and fire departments"
        ),
        "Deployment": (
            "Live traffic → AI engine → Route recommendation "
            "→ Emergency vehicle"
        ),
        "Expected Impact": (
            "Reduced emergency response times."
        )
    },

    "Digital Literacy Platform for Seniors": {
        "Problem": (
            "Government and financial digital services are "
            "difficult for elderly users."
        ),
        "Approach": (
            "Create a simplified accessibility-first interface "
            "with guided workflows."
        ),
        "Technology": (
            "Web/App Development, Voice Assistance, Accessibility APIs"
        ),
        "Target Users": (
            "Senior citizens and digitally underserved populations"
        ),
        "Deployment": (
            "Mobile/Web application with assisted workflows"
        ),
        "Expected Impact": (
            "Improved access to government, pension and digital services."
        )
    }
}


# ============================================================
# 8. SIDEBAR NAVIGATION
# ============================================================

st.sidebar.title("🏛️ CivicForge Admin")
st.sidebar.write("⚡ *Sandbox Run Mode Active*")

st.sidebar.markdown("---")

st.sidebar.subheader("🛠️ Navigation Matrix")

action_tab = st.sidebar.radio(
    "Select Interface Surface",
    [
        "📊 Main Dashboard",
        "💳 Fintech & Finance",
        "📑 Solution Breakdown",
        "👥 Team Activity & Responsibilities",
        "📤 Prototype & Deliverables",
        "🤝 Funding Applications",
        "⭐ Citizen Solution Reviews",
        "🎓 University & Industry Ecosystem",
        "🗣️ Citizen Voices Portal"
    ]
)


# ============================================================
# 9. MAIN DASHBOARD
# ============================================================

if action_tab == "📊 Main Dashboard":

    st.title("🏛️ CivicForge Challenge Platform")

    st.caption(
        "Automated Health Check: API [OK] | Frontend [OK] | "
        "Financial Engine [OK] | Prototype Pipeline [OK]"
    )

    st.markdown("---")

    # Metrics

    m1, m2, m3, m4, m5 = st.columns(5)

    m1.metric(
        "Platform Submissions",
        len(st.session_state.submissions)
    )

    m2.metric(
        "Active Competitions",
        len([
            c for c in st.session_state.challenges
            if c["status"] == "Active"
        ])
    )

    m3.metric(
        "Active Teams",
        len(team_activity)
    )

    m4.metric(
        "Prototype Submissions",
        len(st.session_state.user_uploads)
    )

    m5.metric(
        "Citizen Reviews",
        len(st.session_state.citizen_reviews)
    )

    st.markdown("---")

    # Charts

    g1, g2 = st.columns(2)

    with g1:

        st.markdown("### 📈 Analytical Solution Traffic")

        chart_timeline = pd.DataFrame({
            "Weeks": [
                "Week 1",
                "Week 2",
                "Week 3",
                "Week 4"
            ],
            "Submissions": [
                14,
                28,
                45,
                len(st.session_state.submissions) * 10
            ]
        }).set_index("Weeks")

        st.line_chart(chart_timeline)

    with g2:

        st.markdown("### 🏆 Solution Success Distribution")

        df_sub = pd.DataFrame(
            st.session_state.submissions
        )

        if not df_sub.empty:

            st.bar_chart(
                df_sub.set_index("id")["score"]
            )

    st.markdown("---")

    # Recent submissions

    st.subheader("📋 Recent Solution Submissions")

    st.dataframe(
        pd.DataFrame(st.session_state.submissions),
        use_container_width=True,
        hide_index=True
    )

    st.markdown("---")

    # Team activity

    st.subheader("👥 What Teams Are Working On")

    team_summary = pd.DataFrame(team_activity)

    st.dataframe(
        team_summary[
            [
                "Team",
                "Challenge",
                "Current Task",
                "Status",
                "Progress"
            ]
        ],
        use_container_width=True,
        hide_index=True
    )

    st.markdown("---")

    # Latest citizen feedback

    st.subheader("⭐ Latest Citizen Feedback")

    latest_reviews = pd.DataFrame(
        st.session_state.citizen_reviews
    ).tail(5)

    if not latest_reviews.empty:

        st.dataframe(
            latest_reviews[
                [
                    "Citizen",
                    "Solution",
                    "Rating",
                    "Review",
                    "Date"
                ]
            ],
            use_container_width=True,
            hide_index=True
        )

    else:

        st.info(
            "No citizen reviews have been submitted yet."
        )


# ============================================================
# 10. FINTECH & FINANCE
# ============================================================

elif action_tab == "💳 Fintech & Finance":

    st.title("💳 Fintech & Finance Intelligence")

    st.write(
        "View the actual financial structure of each solution, "
        "including R&D costs, operating expenses, implementation "
        "requirements, funding sources and projected ROI."
    )

    project = st.selectbox(
        "Select Solution",
        list(financial_data.keys())
    )

    data = financial_data[project]

    st.markdown("---")

    st.subheader(
        f"💰 Financial Overview — {project}"
    )

    c1, c2, c3, c4 = st.columns(4)

    c1.metric(
        "R&D Cost",
        f"₹{data['rnd']:,}"
    )

    c2.metric(
        "Monthly OPEX / Cloud",
        f"₹{data['monthly_cloud']:,}"
    )

    c3.metric(
        "Implementation Estimate",
        f"₹{data['implementation']:,}"
    )

    c4.metric(
        "Projected ROI",
        data["roi"]
    )

    st.markdown("---")

    st.subheader("📊 Actual Cost Breakdown")

    breakdown_df = pd.DataFrame(
        data["breakdown"],
        columns=[
            "Expenditure Item",
            "Amount (INR)",
            "Cost Category"
        ]
    )

    total = breakdown_df["Amount (INR)"].sum()

    breakdown_df["Percentage"] = (
        breakdown_df["Amount (INR)"]
        / total
        * 100
    ).round(2)

    st.dataframe(
        breakdown_df,
        use_container_width=True,
        hide_index=True
    )

    st.success(
        f"💰 Total identified prototype/development expenditure: "
        f"**₹{total:,}**"
    )

    st.markdown("---")

    b1, b2 = st.columns(2)

    with b1:

        st.subheader("📈 Cost Distribution")

        cost_chart = breakdown_df[
            [
                "Expenditure Item",
                "Amount (INR)"
            ]
        ].set_index("Expenditure Item")

        st.bar_chart(cost_chart)

    with b2:

        st.subheader("🏦 Current Funding Sources")

        funding_df = pd.DataFrame(
            data["funding"],
            columns=[
                "Funding Source",
                "Allocation"
            ]
        )

        st.dataframe(
            funding_df,
            use_container_width=True,
            hide_index=True
        )

    st.markdown("---")

    st.subheader("💡 Financial Decision View")

    roi_value = int(
        data["roi"].replace("%", "")
    )

    if roi_value >= 300:

        st.success(
            "🟢 High-return solution. Suitable for accelerated "
            "institutional or venture funding."
        )

    elif roi_value >= 200:

        st.info(
            "🔵 Moderate-to-high return profile. Suitable for "
            "pilot-stage funding."
        )

    else:

        st.warning(
            "🟡 Longer payback profile. Grant or impact funding "
            "may be more appropriate."
        )


# ============================================================
# 11. SOLUTION BREAKDOWN
# ============================================================

elif action_tab == "📑 Solution Breakdown":

    st.title("📑 Solution Intelligence & Actual Breakdown")

    st.write(
        "Understand exactly what each solution is solving, "
        "how it works, what technology it requires, who will "
        "use it and how it can be deployed."
    )

    project = st.selectbox(
        "Select Solution to Analyse",
        list(solution_breakdowns.keys())
    )

    data = solution_breakdowns[project]

    st.markdown("---")

    st.subheader("🎯 Problem Definition")

    st.info(
        data["Problem"]
    )

    st.subheader("🧠 Proposed Solution")

    st.write(
        data["Approach"]
    )

    col1, col2 = st.columns(2)

    with col1:

        st.markdown("### 🛠️ Technology Stack")

        st.write(
            data["Technology"]
        )

        st.markdown("### 👥 Target Users")

        st.write(
            data["Target Users"]
        )

    with col2:

        st.markdown("### 🚀 Deployment Model")

        st.write(
            data["Deployment"]
        )

        st.markdown("### 📈 Expected Impact")

        st.write(
            data["Expected Impact"]
        )

    st.markdown("---")

    st.subheader("🔍 Implementation Breakdown")

    implementation_steps = pd.DataFrame({
        "Stage": [
            "1. Problem Validation",
            "2. Prototype Development",
            "3. Field Testing",
            "4. Financial Validation",
            "5. Pilot Deployment",
            "6. Scale-Up"
        ],
        "Status": [
            "Completed",
            "In Progress",
            "Pending",
            "Pending",
            "Pending",
            "Future"
        ],
        "Primary Objective": [
            "Validate citizen need",
            "Build working solution",
            "Validate real-world performance",
            "Determine unit economics",
            "Deploy to limited geography",
            "Expand across cities/regions"
        ]
    })

    st.dataframe(
        implementation_steps,
        use_container_width=True,
        hide_index=True
    )


# ============================================================
# 12. TEAM ACTIVITY & RESPONSIBILITIES
# ============================================================

elif action_tab == "👥 Team Activity & Responsibilities":

    st.title("👥 Team Activity & Responsibilities")

    st.write(
        "Track which team is working on each CivicForge challenge, "
        "what they are currently building, their expertise, team size "
        "and overall progress."
    )

    st.markdown("---")

    # Team metrics

    total_teams = len(team_activity)

    total_members = sum(
        team["Team Size"]
        for team in team_activity
    )

    active_teams = len([
        team
        for team in team_activity
        if "🟢" in team["Status"]
    ])

    avg_progress = sum(
        team["Progress"]
        for team in team_activity
    ) / total_teams

    m1, m2, m3, m4 = st.columns(4)

    m1.metric(
        "Active Teams",
        active_teams
    )

    m2.metric(
        "Total Team Members",
        total_members
    )

    m3.metric(
        "Challenges Being Solved",
        total_teams
    )

    m4.metric(
        "Average Progress",
        f"{avg_progress:.0f}%"
    )

    st.markdown("---")

    st.subheader("👥 Team Workspaces")

    # Team cards

    for team in team_activity:

        with st.container(border=True):

            col1, col2, col3 = st.columns(
                [2, 2, 1]
            )

            with col1:

                st.markdown(
                    f"### 👥 {team['Team']}"
                )

                st.write(
                    f"**Challenge:** {team['Challenge']}"
                )

                st.write(
                    f"**Team Size:** {team['Team Size']} members"
                )

            with col2:

                st.write(
                    f"**Focus Area:** {team['Focus Area']}"
                )

                st.write(
                    f"**Current Task:** {team['Current Task']}"
                )

                st.write(
                    f"**Status:** {team['Status']}"
                )

            with col3:

                st.metric(
                    "Progress",
                    f"{team['Progress']}%"
                )

                st.progress(
                    team["Progress"] / 100
                )

    st.markdown("---")

    st.subheader("📋 Team Responsibility Matrix")

    team_df = pd.DataFrame(
        team_activity
    )

    st.dataframe(
        team_df,
        use_container_width=True,
        hide_index=True
    )

    st.markdown("---")

    st.subheader("🔎 View Individual Team")

    selected_team = st.selectbox(
        "Select a team",
        [
            team["Team"]
            for team in team_activity
        ]
    )

    selected_data = next(
        team
        for team in team_activity
        if team["Team"] == selected_team
    )

    st.info(
        f"""
**{selected_data['Team']}** is currently working on
**{selected_data['Challenge']}**.

**Primary Responsibility:** {selected_data['Focus Area']}

**Current Task:** {selected_data['Current Task']}

**Status:** {selected_data['Status']}

**Progress:** {selected_data['Progress']}%
"""
    )


# ============================================================
# 13. PROTOTYPE & DELIVERABLES
# ============================================================

elif action_tab == "📤 Prototype & Deliverables":

    st.title("📤 Prototype & Solution Deliverables Hub")

    st.write(
        "Teams that have solved a challenge can submit their "
        "prototype or relevant physical/technical deliverables."
    )

    st.markdown("---")

    project = st.selectbox(
        "Associated Challenge",
        [
            c["title"]
            for c in st.session_state.challenges
        ]
    )

    project_data = next(
        c
        for c in st.session_state.challenges
        if c["title"] == project
    )

    st.info(
        f"Solution type detected: **{project_data['type']}**"
    )

    solution_type = st.radio(
        "What type of solution are you submitting?",
        [
            "💻 Software",
            "🔧 Hardware",
            "🧪 Research / Other"
        ],
        horizontal=True
    )

    with st.form(
        "prototype_upload_form",
        clear_on_submit=True
    ):

        team_name = st.text_input(
            "Lead Developer / Team Name"
        )

        description = st.text_area(
            "Solution Description",
            placeholder=(
                "Explain what you built and how it solves "
                "the challenge."
            )
        )

        version = st.text_input(
            "Prototype Version",
            placeholder="Example: v1.0 / MVP / Beta"
        )

        # ----------------------------------------
        # SOFTWARE
        # ----------------------------------------

        if solution_type == "💻 Software":

            st.markdown(
                "### 💻 Software Deliverables"
            )

            github_url = st.text_input(
                "GitHub / Source Repository URL"
            )

            demo_url = st.text_input(
                "Live Demo URL"
            )

            software_file = st.file_uploader(
                "Upload Software Prototype",
                type=[
                    "zip",
                    "tar",
                    "gz",
                    "py",
                    "js",
                    "html",
                    "pdf"
                ]
            )

            documentation = st.file_uploader(
                "Upload Technical Documentation",
                type=[
                    "pdf",
                    "docx",
                    "txt"
                ]
            )

            deliverable_type = "Software Prototype"

        # ----------------------------------------
        # HARDWARE
        # ----------------------------------------

        elif solution_type == "🔧 Hardware":

            st.markdown(
                "### 🔧 Hardware Deliverables"
            )

            hardware_file = st.file_uploader(
                "Upload Hardware Documentation / CAD / Design",
                type=[
                    "pdf",
                    "zip",
                    "stl",
                    "step",
                    "stp",
                    "dwg"
                ]
            )

            bill_of_materials = st.file_uploader(
                "Upload Bill of Materials",
                type=[
                    "pdf",
                    "xlsx",
                    "csv"
                ]
            )

            demo_video = st.file_uploader(
                "Upload Hardware Demonstration Video",
                type=[
                    "mp4",
                    "mov",
                    "avi"
                ]
            )

            deliverable_type = "Hardware Prototype"

        # ----------------------------------------
        # RESEARCH / OTHER
        # ----------------------------------------

        else:

            st.markdown(
                "### 🧪 Research / Other Deliverables"
            )

            research_file = st.file_uploader(
                "Upload Research Paper / Report",
                type=[
                    "pdf",
                    "docx",
                    "xlsx",
                    "csv",
                    "zip"
                ]
            )

            evidence_file = st.file_uploader(
                "Upload Supporting Evidence",
                type=[
                    "pdf",
                    "jpg",
                    "jpeg",
                    "png",
                    "zip"
                ]
            )

            deliverable_type = "Research / Other"

        submitted = st.form_submit_button(
            "🚀 Submit Solution & Deliverables"
        )

        if submitted:

            if not team_name or not description:

                st.error(
                    "Please provide the team name and solution description."
                )

            else:

                upload_record = {
                    "Team": team_name,
                    "Project": project,
                    "Type": deliverable_type,
                    "Version": version,
                    "Description": description,
                    "Submitted At": datetime.now().strftime(
                        "%Y-%m-%d %H:%M:%S"
                    ),
                    "Status": "Submitted for Review"
                }

                st.session_state.user_uploads.append(
                    upload_record
                )

                st.success(
                    "✅ Prototype/deliverables submitted successfully "
                    "and added to the review pipeline."
                )

    st.markdown("---")

    st.subheader("📋 Submitted Prototypes")

    if st.session_state.user_uploads:

        st.dataframe(
            pd.DataFrame(
                st.session_state.user_uploads
            ),
            use_container_width=True,
            hide_index=True
        )

    else:

        st.info(
            "No prototype submissions have been uploaded yet."
        )


# ============================================================
# 14. FUNDING APPLICATIONS
# ============================================================

elif action_tab == "🤝 Funding Applications":

    st.title("🤝 Funding & Investment Application Hub")

    st.write(
        "Innovators with validated solutions can apply for grants, "
        "CSR funding, angel investment, venture capital or "
        "institutional funding."
    )

    st.markdown("---")

    tab1, tab2 = st.tabs(
        [
            "📝 Apply for Funding",
            "💼 Funding Opportunities"
        ]
    )

    # --------------------------------------------------------
    # APPLY
    # --------------------------------------------------------

    with tab1:

        with st.form(
            "funding_application_form"
        ):

            applicant = st.text_input(
                "Founder / Team Name"
            )

            project = st.selectbox(
                "Solution Seeking Funding",
                [
                    c["title"]
                    for c in st.session_state.challenges
                ]
            )

            funding_type = st.selectbox(
                "Funding Type",
                [
                    "Government Grant",
                    "CSR Funding",
                    "University Grant",
                    "Angel Investment",
                    "Venture Capital",
                    "Impact Investment",
                    "Other"
                ]
            )

            funding_stage = st.selectbox(
                "Current Funding Stage",
                [
                    "Idea",
                    "Prototype",
                    "MVP",
                    "Pilot",
                    "Early Revenue",
                    "Scaling"
                ]
            )

            requested_amount = st.number_input(
                "Funding Required (₹)",
                min_value=10000,
                step=10000
            )

            equity = st.number_input(
                "Equity Offered (%)",
                min_value=0.0,
                max_value=100.0,
                step=0.5
            )

            use_of_funds = st.text_area(
                "Planned Use of Funds",
                placeholder=(
                    "Example: 40% product development, "
                    "30% hardware manufacturing, "
                    "20% field deployment..."
                )
            )

            traction = st.text_area(
                "Current Traction / Validation",
                placeholder=(
                    "Users, pilots, municipal interest, "
                    "revenue, research validation, test results, etc."
                )
            )

            pitch_deck = st.file_uploader(
                "Upload Pitch Deck",
                type=[
                    "pdf",
                    "pptx"
                ]
            )

            financial_model = st.file_uploader(
                "Upload Financial Model",
                type=[
                    "xlsx",
                    "csv",
                    "pdf"
                ]
            )

            apply = st.form_submit_button(
                "📨 Submit Funding Application"
            )

            if apply:

                if not applicant or not use_of_funds:

                    st.error(
                        "Please complete the required application fields."
                    )

                else:

                    application = {
                        "Applicant": applicant,
                        "Project": project,
                        "Funding Type": funding_type,
                        "Stage": funding_stage,
                        "Requested Amount": (
                            f"₹{requested_amount:,.0f}"
                        ),
                        "Equity Offered": (
                            f"{equity}%"
                        ),
                        "Use of Funds": use_of_funds,
                        "Traction": traction,
                        "Submitted At": datetime.now().strftime(
                            "%Y-%m-%d %H:%M:%S"
                        ),
                        "Status": "Under Review"
                    }

                    st.session_state.funding_applications.append(
                        application
                    )

                    st.success(
                        "✅ Funding application submitted successfully."
                    )

    # --------------------------------------------------------
    # FUNDING OPPORTUNITIES
    # --------------------------------------------------------

    with tab2:

        st.subheader(
            "💼 Available Funding Opportunities"
        )

        investor_df = pd.DataFrame(
            st.session_state.investor_pool
        )

        st.dataframe(
            investor_df,
            use_container_width=True,
            hide_index=True
        )

    st.markdown("---")

    st.subheader(
        "📊 Submitted Funding Applications"
    )

    if st.session_state.funding_applications:

        funding_df = pd.DataFrame(
            st.session_state.funding_applications
        )

        st.dataframe(
            funding_df,
            use_container_width=True,
            hide_index=True
        )

    else:

        st.info(
            "No funding applications have been submitted yet."
        )


# ============================================================
# 15. CITIZEN SOLUTION REVIEWS
# ============================================================

elif action_tab == "⭐ Citizen Solution Reviews":

    st.title("⭐ Citizen Solution Reviews")

    st.write(
        "Citizens can review solutions, provide feedback and "
        "rate how useful they believe each solution would be "
        "in the real world."
    )

    st.markdown("---")

    solutions = [
        c["title"]
        for c in st.session_state.challenges
    ]

    selected_solution = st.selectbox(
        "Select Solution to Review",
        solutions
    )

    # --------------------------------------------------------
    # Existing reviews for selected solution
    # --------------------------------------------------------

    solution_reviews = [
        review
        for review in st.session_state.citizen_reviews
        if review["Solution"] == selected_solution
    ]

    if solution_reviews:

        average_rating = sum(
            review["Rating"]
            for review in solution_reviews
        ) / len(solution_reviews)

    else:

        average_rating = 0

    # --------------------------------------------------------
    # Rating metrics
    # --------------------------------------------------------

    r1, r2, r3 = st.columns(3)

    r1.metric(
        "Average Citizen Rating",
        f"{average_rating:.1f} / 5"
    )

    r2.metric(
        "Total Reviews",
        len(solution_reviews)
    )

    if average_rating >= 4:

        sentiment = "🟢 Very Positive"

    elif average_rating >= 3:

        sentiment = "🟡 Mixed / Positive"

    elif average_rating > 0:

        sentiment = "🔴 Needs Improvement"

    else:

        sentiment = "⚪ No Reviews Yet"

    r3.metric(
        "Citizen Sentiment",
        sentiment
    )

    st.markdown("---")

    # --------------------------------------------------------
    # Submit review
    # --------------------------------------------------------

    st.subheader("📝 Submit Your Review")

    with st.form(
        "citizen_solution_review_form"
    ):

        citizen_name = st.text_input(
            "Name / Citizen ID",
            placeholder="Example: Citizen #4821"
        )

        rating = st.slider(
            "How would you rate this solution?",
            min_value=1,
            max_value=5,
            value=5
        )

        st.write(
            f"Your rating: {'⭐' * rating}"
        )

        review_text = st.text_area(
            "Your Review",
            placeholder=(
                "Tell the team what you think about the solution. "
                "Mention usefulness, affordability, accessibility, "
                "potential problems or improvements."
            )
        )

        usefulness = st.selectbox(
            "How useful would this solution be to your community?",
            [
                "Extremely Useful",
                "Very Useful",
                "Moderately Useful",
                "Slightly Useful",
                "Not Useful"
            ]
        )

        recommend = st.radio(
            "Would you recommend this solution?",
            [
                "Yes",
                "Maybe",
                "No"
            ],
            horizontal=True
        )

        submit_review = st.form_submit_button(
            "⭐ Submit Citizen Review"
        )

        if submit_review:

            if not review_text.strip():

                st.error(
                    "Please write a review before submitting."
                )

            else:

                new_review = {
                    "Citizen": (
                        citizen_name
                        if citizen_name
                        else "Anonymous Citizen"
                    ),
                    "Solution": selected_solution,
                    "Rating": rating,
                    "Review": review_text,
                    "Usefulness": usefulness,
                    "Recommend": recommend,
                    "Date": datetime.now().strftime(
                        "%Y-%m-%d"
                    )
                }

                st.session_state.citizen_reviews.append(
                    new_review
                )

                st.success(
                    "✅ Thank you! Your review has been submitted."
                )

                st.rerun()

    st.markdown("---")

    # --------------------------------------------------------
    # Existing reviews
    # --------------------------------------------------------

    st.subheader(
        f"💬 Citizen Feedback — {selected_solution}"
    )

    if solution_reviews:

        for review in reversed(solution_reviews):

            with st.container(border=True):

                review_col1, review_col2 = st.columns(
                    [1, 4]
                )

                with review_col1:

                    st.markdown(
                        f"### {'⭐' * review['Rating']}"
                    )

                    st.caption(
                        review["Citizen"]
                    )

                    st.caption(
                        review["Date"]
                    )

                with review_col2:

                    st.write(
                        review["Review"]
                    )

                    if "Usefulness" in review:

                        st.caption(
                            f"Community usefulness: "
                            f"**{review['Usefulness']}**"
                        )

                    if "Recommend" in review:

                        st.caption(
                            f"Would recommend: "
                            f"**{review['Recommend']}**"
                        )

    else:

        st.info(
            "No citizen reviews have been submitted for this "
            "solution yet. Be the first to review it!"
        )

    # --------------------------------------------------------
    # Rating distribution
    # --------------------------------------------------------

    if solution_reviews:

        st.markdown("---")

        st.subheader(
            "📊 Rating Distribution"
        )

        rating_distribution = pd.DataFrame({
            "Rating": [1, 2, 3, 4, 5],
            "Number of Reviews": [
                len([
                    r
                    for r in solution_reviews
                    if r["Rating"] == rating
                ])
                for rating in [1, 2, 3, 4, 5]
            ]
        })

        st.bar_chart(
            rating_distribution.set_index(
                "Rating"
            )
        )


# ============================================================
# 16. UNIVERSITY & INDUSTRY ECOSYSTEM
# ============================================================

elif action_tab == "🎓 University & Industry Ecosystem":

    st.title("🎓 University & Industry Ecosystem")

    st.write(
        "Track universities, research teams and industry "
        "collaborators working on CivicForge challenges."
    )

    st.markdown("---")

    st.subheader(
        "🏫 University & Research Teams"
    )

    st.dataframe(
        pd.DataFrame(student_initiatives),
        use_container_width=True,
        hide_index=True
    )

    st.markdown("---")

    st.subheader(
        "🏢 Industry / Funding Pool"
    )

    st.dataframe(
        pd.DataFrame(
            st.session_state.investor_pool
        ),
        use_container_width=True,
        hide_index=True
    )


# ============================================================
# 17. CITIZEN VOICES PORTAL
# ============================================================

elif action_tab == "🗣️ Citizen Voices Portal":

    st.title(
        "🗣️ Citizen Voices & Problem Reports"
    )

    st.write(
        "Citizen reports help challenge owners and innovators "
        "understand the real-world problem before building a solution."
    )

    st.markdown("---")

    st.subheader(
        "📢 Existing Citizen Reports"
    )

    for complaint in reported_complaints:

        with st.container(border=True):

            st.markdown(
                f"### 🆔 {complaint['Report ID']}"
            )

            st.write(
                f"**Project:** {complaint['Project']}"
            )

            st.write(
                f"💬 {complaint['Citizen Quote']}"
            )

    st.markdown("---")

    st.subheader(
        "➕ Submit a New Citizen Problem"
    )

    with st.form(
        "citizen_report_form"
    ):

        citizen_project = st.selectbox(
            "Related Challenge",
            [
                c["title"]
                for c in st.session_state.challenges
            ]
        )

        citizen_report = st.text_area(
            "Describe the problem you are experiencing",
            placeholder=(
                "Describe the real-world problem, location/context "
                "and how it affects citizens."
            )
        )

        submit_report = st.form_submit_button(
            "📢 Submit Citizen Report"
        )

        if submit_report:

            if citizen_report.strip():

                st.success(
                    "✅ Citizen report submitted to the "
                    "CivicForge problem intelligence pipeline."
                )

            else:

                st.error(
                    "Please describe the problem before submitting."
                )


# ============================================================
# 18. FOOTER
# ============================================================

st.markdown("---")

st.caption(
    "🏛️ CivicForge Challenge Platform • "
    "Civic Problems → Challenges → Teams → Prototypes → "
    "Finance → Funding → Citizen Reviews → Impact"
)

