# Earthquake Monitoring App - Assumptions and Limitations

## Application Overview
This React application displays earthquake data from the USGS (United States Geological Survey) in both tabular and map formats, allowing users to view recent seismic activity across different time ranges.

## Key Assumptions

### Data Source Assumptions
- **USGS API Reliability**: The application assumes the USGS earthquake API (`earthquake.usgs.gov`) remains accessible and maintains its current data structure
- **Data Format Consistency**: Earthquake data follows the GeoJSON format with consistent property names (`place`, `mag`, `time`) and coordinate structure
- **Significant Earthquakes Only**: The app only displays "significant" earthquakes as defined by USGS criteria for faster prototyping and reduced data complexity - significant events are typically magnitude 4.5+ or those causing damage/casualties, making them more relevant for general users while keeping dataset manageable
- **Data Freshness**: USGS data is assumed to be regularly updated and current within the selected time range

### Technical Assumptions
- **Internet Connectivity**: Users have stable internet access for API calls and map tile loading
- **Browser Compatibility**: Modern browser support for ES6+ features, React hooks, and Leaflet mapping library
- **External Service Dependencies**: Third-party services remain available - OpenStreetMap tile servers for map rendering (not included in React build), USGS API endpoints, and CDN-hosted resources
- **CORS Policy**: USGS API allows cross-origin requests from the application domain

### User Experience Assumptions
- **Geographic Knowledge**: Users can interpret coordinate-based map displays and earthquake location descriptions
- **Time Zone Awareness**: Earthquake times are displayed in the user's local time zone via `toLocaleString()`
- **Interaction Patterns**: Users expect clickable table rows to update the map view and understand sorting functionality

## Current Limitations

### Data Limitations
- **Limited Dataset**: Only displays the first 5 earthquakes from each time range - hardcoded limit chosen for prototyping simplicity and faster initial load times, avoiding performance issues with large datasets
- **No Real-time Updates**: Data refreshes only when users change time ranges, not automatically
- **Significant Events Only**: Excludes smaller magnitude earthquakes that might be relevant to specific regions, but reduces noise and focuses on events most likely to be of public interest
- **Time Range Restrictions**: Limited to USGS predefined ranges (day, week, month) - no custom date selection

### Functionality Limitations
- **No Filtering**: Cannot filter by magnitude, depth, region, or other earthquake properties
- **Limited Map Interaction**: No clustering for dense earthquake regions or detailed earthquake information layers
- **No Historical Data**: Cannot access earthquake data beyond USGS feed time limits
- **Single Selection**: Can only highlight one earthquake location at a time on the map

### Performance Limitations
- **No Caching**: API requests are made fresh each time, potentially causing unnecessary network calls
- **Basic Error Handling**: Limited user feedback for API failures or network issues
- **Memory Usage**: All earthquake data kept in memory without pagination or virtualization

### Technical Limitations
- **No Offline Support**: Application requires internet connection for both data and map tiles
- **Fixed Map Provider**: Dependent on OpenStreetMap tiles only - no alternative map layers
- **Limited Accessibility**: May not fully comply with WCAG guidelines for screen readers and keyboard navigation

### UI/UX Limitations
- **Basic Responsive Design**: Layout adapts to different screen sizes with fundamental responsive behavior, but lacks advanced mobile-first optimizations and touch-specific interactions
- **Loading States**: Basic loading indicator without progress feedback or retry options
- **No User Preferences**: Cannot save preferred time ranges, sorting options, or map views
- **Limited Visualization**: No charts, graphs, or advanced data visualization options

## Future Implementation Considerations

### Performance Optimization
- **Virtual Table Rendering**: Implement libraries like `react-window` or `react-virtualized` for handling large earthquake datasets without DOM performance degradation
- **Table Pagination**: Add client-side or server-side pagination to manage large result sets efficiently
- **Data Caching**: Implement smart caching strategies to reduce redundant API calls and improve response times

### Data Management
- **Dynamic Dataset Limits**: Allow users to configure how many earthquakes to display (10, 25, 50, 100+ options)
- **Advanced Filtering**: Add filters for magnitude ranges, depth, time periods, and geographic regions

### Accessibility Improvements
- **WCAG 2.1 AA Compliance**: Implement proper ARIA labels, keyboard navigation patterns, and screen reader optimization

### Enhanced User Experience
- **Progressive Loading**: Implement skeleton screens and incremental data loading for better perceived performance
- **Error Recovery**: Add retry mechanisms and more informative error messages with suggested actions
- **Offline Capabilities**: Cache recent earthquake data for basic offline viewing using service workers

### Advanced Features
- **Prompt based input**: Allow users to input custom date ranges or specific locations for earthquake searches
- **RBAC**: Implement user roles and permissions for admin and regular users
- **Real-time Updates**: WebSocket connections or polling for live earthquake feeds
- **Map Clustering**: Group nearby earthquakes to improve map readability in dense regions
- **Historical Data Analysis**: Charts and graphs showing earthquake trends over time