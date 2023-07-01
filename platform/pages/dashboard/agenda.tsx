import { ReactElement } from "react";
import { useForm, Controller, RegisterOptions } from "react-hook-form";
import { NextPageWithLayout } from "../_app";
import DashboardLayout from "../../layouts/Dashboard";
import Head from "next/head";
import React, { useRef } from "react";
import CustomTimePicker from "../../components/Custom";

interface FormData {
  eventDurationFrom: string;
  eventDurationTo: string;
  eventOpeningFrom: string;
  eventOpeningTo: string;
  findYourSpotFrom: string;
  findYourSpotTo: string;
  firstRoundSessionsFrom: string;
  firstRoundSessionsTo: string;
  secondRoundSessionsFrom: string;
  secondRoundSessionsTo: string;
  registrationFrom: string;
  registrationTo: string;
  presentationsFrom: string;
  presentationsTo: string;
}

const DashboardCreate: NextPageWithLayout = () => {
  const { control, handleSubmit } = useForm<FormData>();
  const ref = useRef();
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Dashboard - Agenda</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div className="md:w-7/12 w-11/12 max-w-screen-xl space-y-4 mx-auto font-exoFont pt-10">
          <h2 className="font-bold">Day 1</h2>

          <div className="flex space-y-2 justify-between items-center border border-black py-1 px-4 rounded-md">
            <label htmlFor="eventDurationFrom" className="font-medium">
              Event duration
            </label>
            <div className="flex space-x-2">
              <Controller
                control={control}
                name="eventDurationFrom"
                rules={{ required: "From time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="eventDurationFrom"
                    placeholder="From"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="eventDurationTo"
                rules={{ required: "To time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="eventDurationTo"
                    placeholder="To"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex space-y-2 justify-between items-center border border-black py-1 px-4 rounded-md">
            <label htmlFor="eventOpeningFrom" className="font-medium">
              Event opening
            </label>
            <div className="flex space-x-2">
              <Controller
                control={control}
                name="eventOpeningFrom"
                rules={{ required: "From time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="eventOpeningFrom"
                    placeholder="From"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="eventOpeningTo"
                rules={{ required: "To time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="eventOpeningTo"
                    placeholder="To"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex space-y-2 justify-between items-center border border-black py-1 px-4 rounded-md">
            <label htmlFor="findYourSpotFrom" className="font-medium">
              Find your spot
            </label>
            <div className="flex space-x-2">
              <Controller
                control={control}
                name="findYourSpotFrom"
                rules={{ required: "From time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="findYourSpotFrom"
                    placeholder="From"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="findYourSpotTo"
                rules={{ required: "To time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="findYourSpotTo"
                    placeholder="To"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex space-y-2 justify-between items-center border border-black py-1 px-4 rounded-md">
            <label htmlFor="firstRoundSessionsFrom" className="font-medium">
              First round mentorship sessions
            </label>
            <div className="flex space-x-2">
              <Controller
                control={control}
                name="firstRoundSessionsFrom"
                rules={{ required: "From time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="firstRoundSessionsFrom"
                    placeholder="From"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="firstRoundSessionsTo"
                rules={{ required: "To time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="firstRoundSessionsTo"
                    placeholder="To"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex space-y-2 justify-between items-center border border-black py-1 px-4 rounded-md font-exoFont">
            <label htmlFor="secondRoundSessionsFrom" className="font-medium">
              Second round mentorship sessions
            </label>
            <div className="flex space-x-2">
              <Controller
                control={control}
                name="secondRoundSessionsFrom"
                rules={{ required: "From time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="secondRoundSessionsFrom"
                    placeholder="From"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="secondRoundSessionsTo"
                rules={{ required: "To time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="secondRoundSessionsTo"
                    placeholder="To"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>

          {/* Add more fields here as needed */}
        </div>

        <div className="md:w-7/12 w-11/12 mx-auto max-w-screen-xl space-y-4 font-exoFont">
          <h2 className="font-bold">Day 2</h2>

          <div className="flex space-y-2 justify-between items-center border border-black py-1 px-4 rounded-md">
            <label htmlFor="registrationFrom" className="font-medium">
              Registration
            </label>
            <div className="flex space-x-2">
              <Controller
                control={control}
                name="registrationFrom"
                rules={{ required: "From time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="registrationFrom"
                    placeholder="From"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="registrationTo"
                rules={{ required: "To time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="registrationTo"
                    placeholder="To"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex space-y-2 justify-between items-center border border-black py-1 px-4 rounded-md">
            <label htmlFor="firstRoundSessionsFrom" className="font-medium">
              First round mentorship sessions
            </label>
            <div className="flex space-x-2">
              <Controller
                control={control}
                name="firstRoundSessionsFrom"
                rules={{ required: "From time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="firstRoundSessionsFrom"
                    placeholder="From"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="firstRoundSessionsTo"
                rules={{ required: "To time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="firstRoundSessionsTo"
                    placeholder="To"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex space-y-2 justify-between items-center border border-black py-1 px-4 rounded-md">
            <label htmlFor="secondRoundSessionsFrom" className="font-medium">
              Second round mentorship sessions
            </label>
            <div className="flex space-x-2">
              <Controller
                control={control}
                name="secondRoundSessionsFrom"
                rules={{ required: "From time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="secondRoundSessionsFrom"
                    placeholder="From"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="secondRoundSessionsTo"
                rules={{ required: "To time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="secondRoundSessionsTo"
                    placeholder="To"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex space-y-2 justify-between items-center border border-black py-1 px-4 rounded-md">
            <label htmlFor="presentationsFrom" className="font-medium">
              Presentations
            </label>
            <div className="flex space-x-2">
              <Controller
                control={control}
                name="presentationsFrom"
                rules={{ required: "From time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="presentationsFrom"
                    placeholder="From"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="presentationsTo"
                rules={{ required: "To time is required" }}
                render={({ field: { onChange, value } }) => (
                  <CustomTimePicker
                    id="presentationsTo"
                    placeholder="To"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>

          {/* Add more fields here as needed */}
        </div>

        <div className="md:w-7/12 w-11/12 max-w-screen-xl mx-auto flex justify-between pb-10">
          <button
            type="button"
            className="py-2 px-7 bg-white border-black border rounded-lg font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-7 bg-greenis text-white rounded-lg font-bold"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
};

DashboardCreate.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardCreate;
