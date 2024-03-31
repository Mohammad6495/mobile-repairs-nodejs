import { Types } from "mongoose";
import EductionalVideoRepository from "../database/all_Repository/eductionalVideo_Repository";
import { IEductionalVideo } from "../utils/interfaces";

import {
  FormateData,
} from "../utils/utility";


class EductionalVideoServices {
  private repository: EductionalVideoRepository;

  constructor() {
    this.repository = new EductionalVideoRepository();
  }

  async CreatedEductionalVideo({ title, headLine, isPayActive, videoTime }: IEductionalVideo) {
    const createdEductionalVideo = await this.repository.Created({ title, headLine, isPayActive, videoTime });
    return FormateData({ data: createdEductionalVideo.toObject({ getters: true }) });
  }

  async EditEductionalVideo({ title, isPayActive, videoTime, id }: IEductionalVideo) {
    const editEductionalVideo = await this.repository.Edit({ id, title, isPayActive, videoTime });
    return FormateData({ data: editEductionalVideo.toObject({ getters: true }) });
  }
  async GetEductionalVideo(currentPage: string, pageSize: string, search: string, headlineId: Types.ObjectId) {
    const getEductionalVideo = await this.repository.Get({ currentPage, pageSize, search, headlineId });
    return FormateData({ data: getEductionalVideo });
  }
  async GetEductionalVideoClient() {
    const getEductionalVideo = await this.repository.GetAll()
    return FormateData({ data: getEductionalVideo.map(item => item.toObject({ getters: true })) });
  }
  async ChangeIsAvailable(id: Types.ObjectId) {
    const data = await this.repository.ChangeIsAvailable({ id });
    return FormateData({ data: data });
  }
  async DeleteEductionalVideo(id: Types.ObjectId) {
    const data = await this.repository.Delete({ id });
    return FormateData({ data: data });
  }
}

export default EductionalVideoServices;
