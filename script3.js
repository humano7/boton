const STATUS_OK = 2;
const STATUS_WARNING = 1;
const STATUS_ALERT = -1;

const API_URL = 'http://192.168.1.107:3000/api/dashboard-data';

async function fetchDashboardData() {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.classList.add('active');

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        loadingIndicator.classList.remove('active');
        return data;
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        loadingIndicator.classList.remove('active');
        showErrorMessage('Failed to fetch dashboard data. Please try again later.');
        return null;
    }
}

function updateDashboard(data) {
    if (!data) return;

    updateSphere('pre', data.dev);
    updateSphere('prod', data.prod);
    updateLatestNews(data);
}

function updateSphere(area, status) {
    const sphere = document.getElementById(`${area}-sphere`);
    const oldStatus = sphere.dataset.status;
    const newStatus = getStatusClass(status);

    if (oldStatus !== newStatus) {
        sphere.classList.remove(`status-${oldStatus}`);
        sphere.classList.add(`status-${newStatus}`);
        sphere.dataset.status = newStatus;

        gsap.to(sphere, {
            duration: 0.5,
            scale: 1.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
    }
}

function getStatusClass(status) {
    switch (status) {
        case STATUS_OK:
            return 'ok';
        case STATUS_WARNING:
            return 'warning';
        case STATUS_ALERT:
            return 'alert';
        default:
            return 'unknown';
    }
}

function updateLatestNews(data) {
    const newsList = document.getElementById('news-list');
    newsList.innerHTML = '';

    const areas = ['dev', 'qa', 'prod'];
    areas.forEach(area => {
        if (data[area] === STATUS_WARNING || data[area] === STATUS_ALERT) {
            const li = document.createElement('li');
            li.textContent = `${area.toUpperCase()} status: ${getStatusText(data[area])}`;
            li.className = data[area] === STATUS_WARNING ? 'warning' : 'alert';
            newsList.appendChild(li);
        }
    });
}

function getStatusText(status) {
    switch (status) {
        case STATUS_OK:
            return 'OK';
        case STATUS_WARNING:
            return 'Warning';
        case STATUS_ALERT:
            return 'Alert';
        default:
            return 'Unknown';
    }
}

function showErrorMessage(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    document.body.appendChild(errorElement);

    setTimeout(() => {
        errorElement.remove();
    }, 5000);
}

function initDashboard() {
    fetchDashboardData().then(updateDashboard);

    setInterval(() => {
        fetchDashboardData().then(updateDashboard);
    }, 15000);
}

document.addEventListener('DOMContentLoaded', initDashboard);