import { IReportData, ITackOptions } from '@bee/track-shared';
import { _extra } from '@bee/track-utils';

export class Record {
  maxRecords = 10;
  records: IReportData[] = [];

  push(data: IReportData): void {
    data.trackTime || (data.trackTime = Date.now());
    if (this.records.length >= this.maxRecords) {
      this.shift();
    }
    this.records.push(data);
    this.records.sort((a, b) => a.trackTime - b.trackTime);
    this.records.map((record: IReportData, index: number) => {
      const prevIndex = index - 1;
      if (prevIndex >= 0) {
        record.parentTrackId = this.records[prevIndex].trackId;
        return record;
      }
    });
  }

  shift(): boolean {
    return this.records.shift() !== undefined;
  }

  clear(): void {
    this.records = [];
  }

  getStrack(): IReportData[] {
    return this.records;
  }

  setting(options: ITackOptions) {
    const { maxRecords } = options;
    this.maxRecords = maxRecords;
  }

  getParentId(trackId: number) {
    return (this.records.find((item) => item.trackId === trackId) || {})
      .parentTrackId;
  }
}

const record = _extra.records || (_extra.records = new Record());
export { record };
