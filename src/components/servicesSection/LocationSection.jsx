import React from 'react'

const LocationSection = () => {
  return (
    <section className="!pt-20">
      <div className="max-w-7xl !mx-auto lg:!px-6">
        <h1
          className="w-full text-center font-extrabold text-[2rem]"
          id="services"
        >
          Live GPS Tracking
        </h1>
        <p className="w-full text-center lg:w-[850px] !mx-auto text-gray-600 !mt-4 text-[1.1rem]">
          Track real-time location of the target phone or device with
          street-level accuracy using GPS, Wi-Fi, and cell towers. View live
          movement on a map, get geofence alerts, and export full route history
          with timestamps and speed.
        </p>
      </div>
    </section>
  );
}

export default LocationSection